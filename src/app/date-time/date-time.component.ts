import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: "app-date-time",
  templateUrl: "./date-time.component.html",
  styleUrls: ["./date-time.component.css"],
  standalone: false,
})
export class DateTimeComponent implements OnInit {
  selected: { startDate: moment.Moment; endDate: moment.Moment } | undefined;
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
    "Last 7 Days": [moment().subtract(6, "days"), moment()],
    "Last 30 Days": [moment().subtract(29, "days"), moment()],
    "This Month": [moment().startOf("month"), moment().endOf("month")],
    "Last Month": [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
  };

  locale = {
    format: "DD/MM/YYYY",
    displayFormat: "DD MMM YYYY",
    firstDay: 1,
  };

  showCustomRangeLabel: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (window.screen.width <= 768) {
      this.showCustomRangeLabel = false;
      this.ranges = {}
    }
  }

  onNavigateToFood(): void {
    if (this.selected === undefined) {
      alert ('Choose a date of departure')
    } else {
      setTimeout(() => {
        this.router.navigate(['/food-page'])
      })
    }
  }
}
