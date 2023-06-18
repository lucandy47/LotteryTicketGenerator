import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TicketHelper } from 'src/app/helpers/ticket-helper';
import { NumberBox } from 'src/app/services/api/dto/number-box';
import { NumbersRow } from 'src/app/services/api/dto/numbers-row';
import { TicketBox } from 'src/app/services/api/dto/ticket-box';

@Component({
  selector: 'app-ticket-box',
  templateUrl: './ticket-box.component.html',
  styleUrls: ['./ticket-box.component.scss']
})
export class TicketBoxComponent implements OnInit, OnChanges{

  @Input("ticketBox") ticketBox!: TicketBox;
  @Input("performNewTicketAction") performNewTicketAction!: boolean;
  
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

  public renderDefaultTicketBox(): void{
    for(let index = 0; index < this.rowsCount; index++){
      let startingRowNumber: number = index*this.rowsCount + 1;
      let numbersRow: NumbersRow= {
        id: index,
        numberBoxes: this.addNumberBoxesToRow(startingRowNumber)
      }
      this.numbersRows.push(numbersRow);
    }
  }

  private addNumberBoxesToRow(startingIndex: number): NumberBox[]{
    let numberBoxes: NumberBox[] = [];
    for(let index = startingIndex; index < startingIndex + this.rowsCount; index++){
      let numberBox: NumberBox = {
        value: index,
        isDrawn: false,
        id: 0
      }
      numberBoxes.push(numberBox);
      this.numberBoxes.push(numberBox);
    }
    return numberBoxes;
  }

  public generateTicket(): void{
    const maxNumbersPicked: number = TicketHelper.MaxNumbersPicked;
    let drawnNumbersCount: number = 0;
    this.renderDefaultTicketBox();
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
    this.onTicketBoxGenerate.emit(this.ticketBox);
  }

  private resetTicketBox(): void{
    this.numberBoxes.forEach((nb: NumberBox)=>{
      nb.isDrawn = false;
    });
  }

  private getTicketBoxChosenNumbers(): void{
    let selectedValues: number[] = [];
  
    for(let row of this.ticketBox.numberRows){
      row.numberBoxes.forEach((nb:NumberBox)=> {
        if(nb.isDrawn){
          selectedValues.push(nb.value);
        }
      });
    }
    this.ticketBox.drawnNumbers = selectedValues.join(',');
    console.log(this.ticketBox);
  }

}
