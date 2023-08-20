/* Variables */
var studentCount = document.querySelector('.student-count');
studentCount.textContent = '0';
var dataForm = document.querySelector("[data-form]");
var studentsData;
/* Event Listeners */
dataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    appendStudent();
});
/* Functions */
/*  Utility Validation Functions */
var isRequired = function (value) { return value === "" ? false : true; };
var isUsernameValid = function (name) {
    var isValid = false;
    if (!name) {
        return isValid;
    }
    else {
        isValid = true;
    }
    return isValid;
};
var isEmailValid = function (email) {
    var emailPattern = new RegExp("");
    return emailPattern.test(email);
};
var isPasswordSecure = function (password) {
    var passwordPattern = new RegExp("");
    return passwordPattern.test(password);
};
var isBetween = function (input, minLength, maxLength) {
    var isBetweenValue = false;
    if (input.value.length < minLength || input.value.length > maxLength) {
        isBetweenValue = false;
    }
    else
        isBetweenValue = true;
    return isBetweenValue;
};
var isInRange = function (input, minValue, maxValue) {
    var inRange = false;
    if (Number(input.value) < minValue || Number(input.value) > maxValue) {
        return inRange;
    }
    else {
        inRange = true;
    }
    return inRange;
};
var displayError = function (input, message) {
    var formGroup = input.parentElement;
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    var formError = document.querySelector(".".concat(input.className.split(" ")[0], " + .form-error"));
    formError.textContent = message;
};
var displaySuccess = function (input) {
    var formGroup = input.parentElement;
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    var formError = document.querySelector(".".concat(input.className.split(" ")[0], " + .form-error"));
    formError.textContent = '';
};
var validateStudentName = function (name) {
    // checking if our form is valid
    var isValid = false;
    var min = 3, max = 20;
    // Check if there's a value present
    if (!isRequired(name.value.trim())) {
        displayError(name, "Student's Name cannot be blank.");
    }
    else if (!isBetween(name, min, max)) {
        displayError(name, "Student's Name must be between ".concat(min, " and ").concat(max, " characters."));
    }
    else if (!isNaN(Number(name.value))) {
        displayError(name, "Student Name should be letters and not numbers");
    }
    else {
        displaySuccess(name);
        isValid = true;
    }
    return isValid;
};
var validateStudentScore = function (score) {
    // checking if our form is valid
    var isValid = false;
    var min = 1, max = 3;
    var minVal = 1, maxVal = 100;
    if (!isRequired(score.value.trim())) {
        displayError(score, "Student's Score cannot be blank.");
    }
    else if (!isBetween(score, min, max)) {
        displayError(score, "Student score should not be between ".concat(min, " and ").concat(max, " characters."));
    }
    else if (!isInRange(score, 1, 100)) {
        displayError(score, "Student score should be between ".concat(minVal, " and ").concat(maxVal, "."));
    }
    else if (isNaN(Number(score.value))) {
        displayError(score, "Student Score should be numbers and not letters");
    }
    else {
        displaySuccess(score);
        isValid = true;
    }
    return isValid;
};
var incrementCount = function (count) {
    studentCount.textContent = count++;
    return studentCount;
};
var decrementCount = function (count) {
    studentCount.textContent = count--;
    return studentCount;
};
var openModal = function () { };
var editStudentData = function (studentElementIndex, nameValue, scoreValue) {
    var editModalContent = "\n        <div class=\"modal-content\">\n            <div class=\"modal-content__header\">\n                <h3 class=\"modal-content__text\">Edit ".concat(nameValue, " record</h3>\n                <button class=\"button--icon\">\n                    <i class=\"fa-solid fa-xmark\"></i>\n                </button>\n            </div>\n    \n            <div class=\"modal-content__body\">\n                <label htmlFor = \"new-student-name\">New Student's Name: \n                    <input type=\"string\" placeholder=\"Enter new Student's name\" id=\"new-student-name\" value=").concat(nameValue, "/>\n                <label/>\n                \n                <label htmlFor = \"new-student-score\">New Student's Score: \n                    <input type=\"string\" placeholder=\"Enter new Student's score\" id=\"new-student-score\" value=").concat(scoreValue, "/>\n                <label/>\n\n                <button class=\"save-btn\"><i class=\"fa-solid fa-floppy-disk\"></i></button>\n            </div>\n        </div>\n    ");
    var editModal = document.querySelector('.edit-modal').innerHTML = editModalContent;
};
var deleteStudentData = function () {
    var deleteModalContent = "\n        <div class=\"modal-content\">\n            <div class=\"modal-content__header\">\n                <h3 class=\"modal-content__text\">Edit {nameValue} record</h3>\n                <button class=\"button--icon\">\n                    <i class=\"fa-solid fa-xmark\"></i>\n                </button>\n            </div>\n    \n            <div class=\"modal-content__body\">\n                \n            </div>\n        </div>\n    ";
    var deleteModal = document.querySelector('.edit-modal').innerHTML = deleteModalContent;
};
var storeStudentData = function (props) { };
var displayStudentData = function () { };
var determineGrade = function (score, grade) {
    if (score >= 85 && score <= 100) {
        grade = "A";
    }
    else if (score >= 75 && score <= 84) {
        grade = "B";
    }
    else if (score >= 60 && score <= 74) {
        grade = "C";
    }
    else if (score >= 50 && score <= 59) {
        grade = "D";
    }
    else if (score >= 40 && score <= 49) {
        grade = "E";
    }
    else if (score < 40) {
        grade = "F";
    }
    else {
        grade = "Invalid";
    }
    return grade;
};
var appendStudent = function () {
    var studentName = document.querySelector('[data-name]');
    var studentNameValue = studentName.value;
    var studentScore = document.querySelector('[data-score]');
    var studentScoreValue = Number(studentScore.value);
    if (!validateStudentName(studentName) && !validateStudentScore(studentScore) || !validateStudentName(studentName) || !validateStudentScore(studentScore))
        return;
    // if (validateForms(studentName.value, Number(studentScore.value))) return
    else {
        studentsData = {
            name: studentNameValue,
            score: studentScoreValue
        };
        var resultList = document.querySelector(".data__list");
        var studentEl = document.createElement('div');
        studentEl.classList.add('student');
        studentEl.innerHTML =
            // ${studentsData.grade == "" ? "N/A" : 
            // resultList.children.length === 0 ? "<p>No Students added</p>" :  
            "\n            <div class=\"student__details\">\n                <span class=\"student__name\">Name: ".concat(studentsData.name, "</span>\n                <span class=\"student__score\">Score: ").concat(studentsData.score, "</span>\n                <span class=\"student__grade\">Grade: \n                ").concat(!studentsData.grade ? 'N/A' : studentsData.grade, "</span>\n            </div>\n            <div class=\"student-action\">\n            // <button onclick=\"\" class=\"calculate-btn\">Calculate Grade</button>\n            <button onclick=\"\" class=\"edit-btn\"><i class=\"fa-duotone fa-pen-to-square\"></i></button>\n            <button onclick=\"\" class=\"delete-btn\"><i class=\"fa-duotone fa-trash\"></i></button>\n            </div>\n        ");
        /* use template string literals for data and values, not javascript events */
        // <button onclick="${determineGrade(studentsData.score, studentsData.grade)}" class="calculate-btn">Calculate Grade</button>
        resultList.append(studentEl);
        incrementCount(resultList.children.length);
        console.log(resultList.children);
        studentName.value = "", studentScore.value = "";
        return studentsData;
    }
};
/* Extras */ 
