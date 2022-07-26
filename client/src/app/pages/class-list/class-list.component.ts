import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
// Import Services
import { ClassService } from '../../services/class.service';
// Import Models
import { Class } from '../../domain/gestion_alpha_db/class';

// START - USED SERVICES
/**
* ClassService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* ClassService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Class
 * @class ClassListComponent
 */
@Component({
    selector: 'app-class-list',
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
    list: Class[];
    search: any = {};
    idSelected: string;
    constructor(
        private classService: ClassService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.classService.list().subscribe(list => this.list = list);
    }

    /**
     * Select Class to remove
     *
     * @param {string} id Id of the Class to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Class
     */
    deleteItem() {
        this.classService.remove(this.idSelected).subscribe(data => this.list = this.list.filter(el => el._id !== this.idSelected));
    }

}
