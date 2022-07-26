// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { ClassService } from '../../services/class.service';
import { CourseService } from '../../services/course.service';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';
// Import Models
import { Class } from '../../domain/gestion_alpha_db/class';
import { Course } from '../../domain/gestion_alpha_db/course';
import { Student } from '../../domain/gestion_alpha_db/student';
import { Teacher } from '../../domain/gestion_alpha_db/teacher';

// START - USED SERVICES
/**
* ClassService.create
*	@description CRUD ACTION create
*
* ClassService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* ClassService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* CourseService.list
*	@description CRUD ACTION list
*
* TeacherService.list
*	@description CRUD ACTION list
*
* StudentService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Class
 */
@Component({
    selector: 'app-class-edit',
    templateUrl: 'class-edit.component.html',
    styleUrls: ['class-edit.component.css']
})
export class ClassEditComponent implements OnInit {
    item: Class;
    list_course: Course[];
    list_student: Student[];
    list_teacher: Teacher[];
    model: Class;
    formValid: Boolean;

    constructor(
    private classService: ClassService,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Class();
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.classService.get(id).subscribe(item => this.item = item);
            }
            // Get relations
            this.courseService.list().subscribe(list => this.list_course = list);
            this.studentService.list().subscribe(list => this.list_student = list);
            this.teacherService.list().subscribe(list => this.list_teacher = list);
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
     * Add Course from Class
     *
     * @param {string} id Id of Course to add in this.item._course array
     */
    addCourse(id: string) {
        if (!this.item._course)
            this.item._course = [];
        this.item._course.push(id);
    }

    /**
     * Remove an Course from a Class
     *
     * @param {number} index Index of Course in this.item._course array
     */
    removeCourse(index: number) {
        this.item._course.splice(index, 1);
    }
    /**
     * Check if an Teacher is in  _teacher
     *
     * @param {string} id Id of Teacher to search
     * @returns {boolean} True if it is found
     */
    containTeacher(id: string): boolean {
        if (!this.item._teacher) return false;
        return this.item._teacher.indexOf(id) !== -1;
    }

    /**
     * Add Teacher from Class
     *
     * @param {string} id Id of Teacher to add in this.item._teacher array
     */
    addTeacher(id: string) {
        if (!this.item._teacher)
            this.item._teacher = [];
        this.item._teacher.push(id);
    }

    /**
     * Remove an Teacher from a Class
     *
     * @param {number} index Index of Teacher in this.item._teacher array
     */
    removeTeacher(index: number) {
        this.item._teacher.splice(index, 1);
    }

    /**
     * Save Class
     *
     * @param {boolean} formValid Form validity check
     * @param Class item Class to save
     */
    save(formValid: boolean, item: Class): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.classService.update(item).subscribe(data => this.goBack());
            } else {
                this.classService.create(item).subscribe(data => this.goBack());
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



