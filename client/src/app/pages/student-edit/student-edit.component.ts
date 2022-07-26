// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { StudentService } from '../../services/student.service';
import { ExamService } from '../../services/exam.service';
import { ClassService } from '../../services/class.service';
import { CourseService } from '../../services/course.service';
// Import Models
import { Student } from '../../domain/gestion_alpha_db/student';
import { Course } from '../../domain/gestion_alpha_db/course';
import { Exam } from '../../domain/gestion_alpha_db/exam';
import { Class } from '../../domain/gestion_alpha_db/class';

// START - USED SERVICES
/**
* StudentService.create
*	@description CRUD ACTION create
*
* StudentService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* StudentService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* ExamService.findBy_student
*	@description CRUD ACTION findBy_student
*	@param Objectid key Id of model to search for
*
* ClassService.findBy_student
*	@description CRUD ACTION findBy_student
*	@param Objectid key Id of model to search for
*
* CourseService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Student
 */
@Component({
    selector: 'app-student-edit',
    templateUrl: 'student-edit.component.html',
    styleUrls: ['student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
    item: Student;
    list_course: Course[];
    externalExam__student: Exam[];
    externalClass__student: Class[];
    model: Student;
    formValid: Boolean;

    constructor(
    private studentService: StudentService,
    private examService: ExamService,
    private classService: ClassService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Student();
        this.externalExam__student = [];
        this.externalClass__student = [];
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.studentService.get(id).subscribe(item => this.item = item);
                this.examService.findBy_student(id).subscribe(list => this.externalExam__student = list);
                this.classService.findBy_student(id).subscribe(list => this.externalClass__student = list);
            }
            // Get relations
            this.courseService.list().subscribe(list => this.list_course = list);
        });
    }

    /**
     * Check if an Course is in  _course
     *
     * @param {string} id Id of Course to search
     * @returns {boolean} True if it is found
     */
    containCourse(id: string): boolean {
        if (!this.item._course) return false;
        return this.item._course.indexOf(id) !== -1;
    }

    /**
     * Add Course from Student
     *
     * @param {string} id Id of Course to add in this.item._course array
     */
    addCourse(id: string) {
        if (!this.item._course)
            this.item._course = [];
        this.item._course.push(id);
    }

    /**
     * Remove an Course from a Student
     *
     * @param {number} index Index of Course in this.item._course array
     */
    removeCourse(index: number) {
        this.item._course.splice(index, 1);
    }

    /**
     * Save Student
     *
     * @param {boolean} formValid Form validity check
     * @param Student item Student to save
     */
    save(formValid: boolean, item: Student): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.studentService.update(item).subscribe(data => this.goBack());
            } else {
                this.studentService.create(item).subscribe(data => this.goBack());
            } 
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }


}



