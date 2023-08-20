/* Types */
type studentName = string | null;
type studentGrade = string | null;
type studentScore = number | null;

/* Interfaces */
interface StudentObject {
    name: string;
    grade?: string;
    score: number;
}

/* Variables */
const dataForm: HTMLFormElement = document.querySelector("[data-form]")!;

/* Event Listeners */
dataForm.addEventListener('submit', () => appendStudent)

/* Functions */
const appendStudent = () => {

    let studentsData!: StudentObject;

    const studentName: HTMLInputElement = document.querySelector('[data-name]')!;

    const studentScore: HTMLInputElement = document.querySelector('[data-score]')!;

    studentsData = {
        name: studentName.value, 
        score: Number(studentScore.value),
    }

    const resultList: HTMLDivElement = document.querySelector(".result__list")!;

    const studentEl = document.createElement('div');
    studentEl.innerHTML = `
        <div class="student__details">
            <span class="student__name">${studentsData.name}</span>
            <span class="student__score">${studentsData.score}</span>
            <span class="student__grade">${null}</span>
        </div>
        <div class="student-action">
            <button class="calculate-btn">Calculate Grade</button>
            <button onclick="editStudentData()" class="edit-btn">Edit</button>
            <button onclick="deleteStudentData()" class="delete-btn">Delete</button>
        </div>
    `
    resultList.append(studentEl);

}

const editStudentData = () => {}

const deleteStudentData = () => {}

const storeStudentData = (props: StudentObject) => {} 

const displayStudentData = () => {}

const determineGrade = (score: number): number => {
    return 0;
}

/* Extras */