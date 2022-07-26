// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { CourseService } from '../../services/course.service';
import { ExamService } from '../../services/exam.service';
import { ClassService } from '../../services/class.service';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';
// Import Models
import { Course } from '../../domain/gestion_alpha_db/course';
import { Class } from '../../domain/gestion_alpha_db/class';
import { Student } from '../../domain/gestion_alpha_db/student';
import { Teacher } from '../../domain/gestion_alpha_db/teacher';
import { Exam } from '../../domain/gestion_alpha_db/exam';

// START - USED SERVICES
/**
* CourseService.create
*	@description CRUD ACTION create
*
* CourseService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* CourseService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* ExamService.findBy_course
*	@description CRUD ACTION findBy_course
*	@param Objectid key Id of model to search for
*
* ClassService.findBy_course
*	@description CRUD ACTION findBy_course
*	@param Objectid key Id of model to search for
*
* TeacherService.findBy_course
*	@description CRUD ACTION findBy_course
*	@param Objectid key Id of model to search for
*
* StudentService.findBy_course
*	@description CRUD ACTION findBy_course
*	@param Objectid key Id of model to search for
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Course
 */
@Component({
    selector: 'app-course-edit',
    templateUrl: 'course-edit.component.html',
    styleUrls: ['course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
    item: Course;
    externalClass__course: Class[];
    externalStudent__course: Student[];
    externalTeacher__course: Teacher[];
    externalExam__course: Exam[];
    model: Course;
    formValid: Boolean;

    constructor(
    private courseService: CourseService,
    private examService: ExamService,
    private classService: ClassService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Course();
        this.externalClass__course = [];
        this.externalStudent__course = [];
        this.externalTeacher__course = [];
        this.externalExam__course = [];
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.courseService.get(id).subscribe(item => this.item = item);
                this.classService.findBy_course(id).subscribe(list => this.externalClass__course = list);
                this.studentService.findBy_course(id).subscribe(list => this.externalStudent__course = list);
                this.teacherService.findBy_course(id).subscribe(list => this.externalTeacher__course = list);
                this.examService.findBy_course(id).subscribe(list => this.externalExam__course = list);
            }
            // Get relations
        });
    }


    /**
     * Save Course
     *
     * @param {boolean} formValid Form validity check
     * @param Course item Course to save
     */
    save(formValid: boolean, item: Course): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.courseService.update(item).subscribe(data => this.goBack());
            } else {
                this.courseService.create(item).subscribe(data => this.goBack());
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



