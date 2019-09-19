import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Pagination } from './loading-on-demand.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'uts-loading-on-demand',
    templateUrl: './loading-on-demand.component.html',
    styles: []
})
export class LoadingOnDemandComponent implements OnInit {

    private page: number = 1;
    private itensPerPage: number = 10;

    private dataResult: Pagination<any>;
    @Output() data: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Enviar uma string com `{{{page}}}` e/ou `{{{itensPerPage}}}`. Será ai que eu irei substituir pelos números da página.
     */
    @Input() dataUrl: string;

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
        this.loadData();
    }

    public get canLoadMoreData(): boolean {
        if (this.page < this.dataResult.last_page) {
            return true;
        } else {
            return false;
        }
    }

    public loadData(): void {
        if (this.canLoadMoreData == true) {
            let dataUrl = this.dataUrl.replace("{{{page}}}", this.page.toString()).replace("{{{itensPerPage}}}", this.itensPerPage.toString());
            this.httpClient.get<Pagination<any>>(dataUrl).subscribe((result) => this.handlePagination(result));
        }
    }

    private handlePagination(result: Pagination<any>): void {
        if (result.last_page > this.page) {
            this.page++;
        }
        this.dataResult = result;
        this.data.emit(this.dataResult);
    }
}
