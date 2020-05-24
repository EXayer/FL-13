class Student {

    constructor(name, email) {
        const _name = name;
        this.getName = () => _name;

        const _email = email;
        this.getEmail = () => _email;

        this._results = [];
    }

    addHomeworkResult(topic, result) {
        this._results.push({topic, result});

        return this;
    }
}

class FrontendLab {

    constructor(studentList, failedHomeworksLimit) {
        const _studentList = [];

        studentList.forEach((item) => {
            _studentList.push(new Student(item.name, item.email));
        });

        this.getStudents = () => _studentList;

        const _failedHomeworksLimit = failedHomeworksLimit;
        this.getLimit = () => _failedHomeworksLimit;
    }


    printStudentsList() {
        this.getStudents().forEach((student) => {
            console.log(`name: ${student.getName()} email: ${student.getEmail()}`);
            console.log(student._results);
        });
    }

    addHomeworkResults(homeworkResults) {
        homeworkResults.results.forEach((result) => {
            this.getStudents().forEach((student) => {
                if (student.getEmail() === result.email) {
                    student.addHomeworkResult(homeworkResults.topic, result.success);
                    return;
                }
            });
        });
    }

    printStudentsEligibleForTest() {
        this.getStudents().forEach((student) => {
            let failed = 0;
            student._results.forEach((work) => {
                if (!work.result) {
                    failed++;
                }
            });

            if (failed <= this.getLimit()) {
                console.log(`name: ${student.getName()} email: ${student.getEmail()}`);
            }
        });
    }
}
