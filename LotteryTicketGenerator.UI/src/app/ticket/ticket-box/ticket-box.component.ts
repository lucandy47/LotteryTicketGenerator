import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TicketHelper } from 'src/app/helpers/ticket-helper';
import { NumberBox } from 'src/app/services/api/dto/number-box';
import { NumbersRow } from 'src/app/services/api/dto/numbers-row';
import { Ticket } from 'src/app/services/api/dto/ticket';
import { TicketBox } from 'src/app/services/api/dto/ticket-box';

@Component({
  selector: 'app-ticket-box',
  templateUrl: './ticket-box.component.html',
  styleUrls: ['./ticket-box.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        animate('2500ms', keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 1, offset: 1 }),
        ])),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        animate('1000ms', keyframes([
          style({ transform: 'translateY(-100%)', offset: 0 }),
          style({ transform: 'translateY(0)', offset: 1 }),
        ])),
      ]),
    ]),
  ],
})
export class TicketBoxComponent implements OnInit, OnChanges{

  @Input("ticketBox") ticketBox!: TicketBox;
  @Input("performNewTicketAction") performNewTicketAction!: boolean;
  @Input("ticket") ticket!: Ticket;

  @Output('onTicketBoxGenerate') onTicketBoxGenerate = new EventEmitter<TicketBox>();

  constructor(){

  }

  public rowsCount: number = TicketHelper.BoxesPerRowNumber;
  public numbersRows: NumbersRow[] = [];
  public numberBoxes: NumberBox[] = [];

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void{
    if(changes['performNewTicketAction'].currentValue != changes['performNewTicketAction'].previousValue){
      this.generateTicket();
    }
  }

  public generateTicket(): void{
    if(this.ticket.id == 0){
      this.generateRandomTicket();
    }else{
      this.drawExistingTicket();
    }
    
    this.onTicketBoxGenerate.emit(this.ticketBox);
  }

  private drawExistingTicket(): void{
    const drawnValues: number[] = this.ticketBox.drawnNumbers.split(',').map(Number);
    this.renderDefaultTicketBox(drawnValues);
  }

  private generateRandomTicket(): void{
    const maxNumbersPicked: number = TicketHelper.MaxNumbersPicked;
    let drawnNumbersCount: number = 0;
    this.renderDefaultTicketBox([]);
    this.resetTicketBox();
    while(drawnNumbersCount !== maxNumbersPicked){
      const randomNumber: number = Math.floor(Math.random() * 49) + 1;
      let numberBox = this.numberBoxes.find(nb => nb.value == randomNumber);

      if(numberBox == undefined || numberBox.isDrawn) continue;

      numberBox.isDrawn = true;
      drawnNumbersCount = drawnNumbersCount + 1;
      if(drawnNumbersCount == maxNumbersPicked) break;
    }
  
    this.ticketBox.numberRows = this.numbersRows;
    this.getTicketBoxChosenNumbers();
  }

  private renderDefaultTicketBox(drawnNumbers: number[]): void{
    for(let index = 0; index < this.rowsCount; index++){
      let startingRowNumber: number = index*this.rowsCount + 1;
      let numbersRow: NumbersRow = {
        id: index,
        numberBoxes: this.addNumberBoxesToRow(startingRowNumber,drawnNumbers)
      }
      this.numbersRows.push(numbersRow);
    }
  }

  private addNumberBoxesToRow(startingIndex: number, drawnNumbers: number[]): NumberBox[]{
    let numberBoxes: NumberBox[] = [];
    for(let index = startingIndex; index < startingIndex + this.rowsCount; index++){
      let numberBox: NumberBox = {
        value: index,
        isDrawn: drawnNumbers.includes(index) ? true : false,
        id: 0
      }
      numberBoxes.push(numberBox);
      this.numberBoxes.push(numberBox);
    }
    return numberBoxes;
  }

  private resetTicketBox(): void{
    this.numberBoxes.forEach((nb: NumberBox)=>{
      nb.isDrawn = false;
    });
  }

  private getTicketBoxChosenNumbers(): void{
    let selectedValues: number[] = [];
  
    for(let numberBox of this.numberBoxes){
      if(numberBox.isDrawn){
        selectedValues.push(numberBox.value);
      }
    }
    
    this.ticketBox.drawnNumbers = selectedValues.join(',');
  }

}
