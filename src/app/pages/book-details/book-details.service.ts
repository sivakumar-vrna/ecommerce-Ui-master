import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BookDetailsPage } from './book-details.page';

@Injectable({
    providedIn: 'root'
})

export class BookDetailsService {

    constructor(
        public modalController: ModalController,
        private router: Router,
    ) { }

    async bookDetailsModal(id: number) {
        const modal = await this.modalController.create({
            component: BookDetailsPage,
            cssClass: 'movie-details-modal',
            componentProps: {
                'bookId': id,
            }
        });
        await modal.present();

        const { role } = await modal.onDidDismiss();

        this.router.navigate([], {
            queryParams: {
                'id': null,
            },
            queryParamsHandling: 'merge'
        })
    }
}
