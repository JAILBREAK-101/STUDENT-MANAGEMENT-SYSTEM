/* Types */
type studentName = string | null;
type studentGrade = string | null;
type studentScore = number | null;

// typing an object
/*
type ObjectParam = Record<string, unknown>
type ObjectParam2 = {
    [index: string]: unknown
}
*/

/* Interfaces */
interface StudentObject {
    name: string;
    grade?: string;
    score: number;
}

/* Variables */
let studentCount: any = document.querySelector('.student-count');
studentCount.textContent = '0';
const dataForm: HTMLFormElement = document.querySelector("[data-form]")!;
let studentsData!: StudentObject;
// let grade: studentGrade = "";

/* Event Listeners */
dataForm.addEventListener('submit', (e: Event) => {
    e.preventDefault()
    appendStudent()
})

/* Functions */

    /*  Utility Validation Functions ==============*/

    const isRequired = (value: string): boolean => value === "" ? false : true;

    const isUsernameValid = (name: string): boolean => {
        let isValid: boolean = false;

        if (!name) {
            return isValid;
        }
        else {
            isValid = true
        }
        return isValid
    }

    const isEmailValid = (email: string): any => {
        const emailPattern = new RegExp("");
        return emailPattern.test(email)
    }

    const isPasswordSecure = (password: string): any => {
        const passwordPattern = new RegExp("");
        return passwordPattern.test(password)
    }

    const isBetween = (input: HTMLInputElement, minLength: number, maxLength: number): boolean => {
        let isBetweenValue: boolean = false;
        if (input.value.length < minLength || input.value.length > maxLength) {
            isBetweenValue = false
        }
        else isBetweenValue = true;
        
        return isBetweenValue;
    }

    const isInRange = (input: HTMLInputElement, minValue: number, maxValue: number): boolean => {
        let inRange: boolean = false;
        if (Number(input.value) < minValue || Number(input.value) > maxValue) {
            return inRange
        }
        else {
            inRange = true
        }
        return inRange
    }

    const displayError = (input: HTMLInputElement, message: string): void => {
        const formGroup = input.parentElement;

        formGroup.classList.remove('success')
        formGroup.classList.add('error')

        const formError = document.querySelector(`.${input.className.split(" ")[0]} + .form-error`);
        formError.textContent = message
    }

    const displaySuccess = (input: HTMLInputElement): void => {
        const formGroup = input.parentElement

        formGroup.classList.remove('error')
        formGroup.classList.add('success')

        const formError = document.querySelector(`.${input.className.split(" ")[0]} + .form-error`)
        formError.textContent = ''
    }
    /* ============ Utility Vallidation Functions */

const validateStudentName = (name: HTMLInputElement): boolean => {
    // checking if our form is valid
    let isValid: boolean = false;
    const min: number = 3, max: number = 20
    
    // Check if there's a value present
    if(!isRequired(name.value.trim())) {
        displayError(name, "Student's Name cannot be blank.")
    }
    else if(!isBetween(name, min, max)) {
        displayError(name, `Student's Name must be between ${min} and ${max} characters.`)
    }
    else if(!isNaN(Number(name.value))) { /* added - manual*/
        displayError(name, "Student Name should be letters and not numbers")
    }
    else {
        displaySuccess(name)
        isValid = true;
    }
    return isValid
}

const validateStudentScore = (score: HTMLInputElement): boolean => {
    // checking if our form is valid
    let isValid = false;
    const min: number = 1, max: number = 3;
    const minVal: number = 1, maxVal: number = 100;

    if (!isRequired(score.value.trim())) {
        displayError(score, "Student's Score cannot be blank.")
    }
    else if (!isBetween(score, min, max)) {
        displayError(score, `Student score should not be between ${min} and ${max} characters.`)
    }
    else if(!isInRange(score, 1, 100)) { /* added - manual*/
        displayError(score, `Student score should be between ${minVal} and ${maxVal}.`)
    }
    else if(isNaN(Number(score.value))) { /* added - manual*/
        displayError(score, "Student Score should be numbers and not letters")
    }
    else {
        displaySuccess(score)
        isValid = true
    }
    return isValid
}

const incrementCount= (count: number): number => {
    studentCount.textContent = count++;
    return studentCount;
}

const decrementCount = (count: number): number => {
    studentCount.textContent = count--
    return studentCount;
}

const openModal = () => {}

const editStudentData = (nameValue: string, scoreValue: number) => {
    const editModalContent = `
        <div class="modal-content">
            <div class="modal-content__header">
                <h3 class="modal-content__text">Edit ${nameValue} record</h3>
                <button class="button--icon">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
    
            <div class="modal-content__body">
                <label htmlFor = "new-student-name">New Student's Name: 
                    <input type="string" placeholder="Enter new Student's name" id="new-student-name" value=${nameValue}/>
                <label/>
                
                <label htmlFor = "new-student-score">New Student's Score: 
                    <input type="string" placeholder="Enter new Student's score" id="new-student-score" value=${scoreValue}/>
                <label/>

                <button class="save-btn"><i class="fa-solid fa-floppy-disk"></i></button>
            </div>
        </div>
    `

    const editModal: string = document.querySelector('.edit-modal').innerHTML = editModalContent;
}

const deleteStudentData = () => {
    const deleteModalContent = `
        <div class="modal-content">
            <div class="modal-content__header">
                <h3 class="modal-content__text">Edit {nameValue} record</h3>
                <button class="button--icon">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
    
            <div class="modal-content__body">
                
            </div>
        </div>
    `

    const deleteModal: string = document.querySelector('.edit-modal').innerHTML = deleteModalContent;
}

const storeStudentData = (props: StudentObject) => {}

const displayStudentData = () => {}

const determineGrade = (score: number, data: StudentObject): string => {

    // pass in data for storage
    if (score >= 85 && score <= 100) {
        return "A"
    }
    else if (score >= 75 && score <= 84) {
        return "B"
    }
    else if (score >= 60 && score <= 74) {
        return "C"
    }
    else if (score >= 50 && score <= 59) {
        return "D"
    }
    else if (score >= 40 && score <= 49) {
        return "E"
    }
    else if (score < 40) {        // data.grade = "F"
        return "F"
    }
    else {
        return "Invalid"
    }

    // Bind to the variable grade after the grade has been computed
    // const student__grade: string = document.querySelector('.student__grade').
    // innerHTML = `<span>Grade: ${grade}</span>`;
};

const displayGrade = (score: number, data: StudentObject) => {
    const student__grade: string = determineGrade(score, data);
    const studentGradeElement: HTMLSpanElement = document.querySelector(`.grade-${score}`)
    studentGradeElement.textContent = `Grade: ${student__grade}`
}

const appendStudent = (): StudentObject => {
    
    const studentName: HTMLInputElement = document.querySelector('[data-name]')!;
    const studentNameValue: string = studentName.value
    
    const studentScore: HTMLInputElement = document.querySelector('[data-score]')!;
    const studentScoreValue: number = Number(studentScore.value)

    if (!validateStudentName(studentName) && !validateStudentScore(studentScore) || !validateStudentName(studentName) || !validateStudentScore(studentScore)) return;

    // if (validateForms(studentName.value, Number(studentScore.value))) return
   
    else {
        studentsData = {
            name: studentNameValue, 
            score: studentScoreValue,
        }

        const resultList: HTMLDivElement = document.querySelector(".data__list");

        const studentEl: HTMLDivElement = document.createElement('div');
        studentEl.classList.add('student');
        studentEl.innerHTML = 
            // ${studentsData.grade == "" ? "N/A" : 
            // resultList.children.length === 0 ? "<p>No Students added</p>" :  
        `
            <div class="student__details">
                <span class="student__name">Name: ${studentsData.name}</span>
                <span class="student__score">Score: ${studentsData.score}</span>
                <span class="grade-${studentsData.score}"></span>
            </div>
            <div class="student-action">
            <button onclick = "displayGrade(${studentsData.score, studentsData.grade})" class="calculate-btn">Calculate Grade</button>
            <button class="edit-btn"><i class="fa-duotone fa-pen-to-square"></i></button>
            <button class="delete-btn"><i class="fa-duotone fa-trash"></i></button>
            </div>
        `
            /* use template string literals for data and values, not javascript events */
        
        resultList.append(studentEl);

        incrementCount(resultList.children.length)

        console.log(resultList.children)

        studentName.value = "", studentScore.value = ""

        return studentsData
    }
}

/* Extras */