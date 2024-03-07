interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);

    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

interface Validatable {
  value: string | number;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  if (
    validatableInput.minlength !== undefined &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid && validatableInput.value.length > validatableInput.minlength;
  }

  if (
    validatableInput.maxlength !== undefined &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid && validatableInput.value.length < validatableInput.maxlength;
  }

  if (
    validatableInput.min !== undefined &&
    typeof validatableInput.value === 'number'
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }

  if (
    validatableInput.max !== undefined &&
    typeof validatableInput.value === 'number'
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}

function autoBind<T>(
  _: any,
  _2: string | Symbol,
  descriptor: TypedPropertyDescriptor<T>
) {
  const originalMethod = descriptor.value as Function;
  const adjDescriptior: TypedPropertyDescriptor<T> = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptior;
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.querySelector(templateId)!;
    this.hostElement = document.querySelector(hostElementId)!;

    const imporedNode = document.importNode(this.templateElement.content, true);
    this.element = imporedNode.firstElementChild as U;
    if (newElementId) this.element.id = newElementId;

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning === true ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return '1 person';
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super('#single-project', hostId, false, project.id);

    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent): void {
    console.log('dragend');
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

class ProjectList
  extends Component<HTMLDivElement, HTMLAnchorElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('#project-list', '#app', false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @autoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @autoBind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @autoBind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }

        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + 'PROJECTS';
  }

  private renderProjects() {
    const listEl = document.querySelector(
      `#${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';

    for (const prjItem of this.assignedProjects) {
      console.log(this.element.id);

      new ProjectItem(`#${this.element.querySelector('ul')!.id}`, prjItem);
    }
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  desctiptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('#project-input', '#app', true, 'user-input');

    this.titleInputElement = this.element.querySelector('#title')!;
    this.desctiptionInputElement = this.element.querySelector('#description')!;
    this.peopleInputElement = this.element.querySelector('#people')!;

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.sumbitHandler);
  }

  renderContent(): void {}

  private gatherUserInput(): [string, string, number] | void {
    const entredTitle = this.titleInputElement.value;
    const entredDescription = this.desctiptionInputElement.value;
    const entrerdPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: entredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: entredDescription,
      required: true,
      minlength: 10,
    };

    const peopleValidatable: Validatable = {
      value: +entrerdPeople,
      required: true,
      min: 1,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input!!!');
      return;
    } else {
      return [entredTitle, entredDescription, +entrerdPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.desctiptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @autoBind
  private sumbitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;

      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}

const prjInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
