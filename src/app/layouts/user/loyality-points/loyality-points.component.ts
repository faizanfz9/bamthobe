import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-loyality-points',
  templateUrl: './loyality-points.component.html',
  styleUrls: ['./loyality-points.component.scss']
})
export class LoyalityPointsComponent implements OnInit {
  points: any = [];
  totalPoints: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoyalityPoints().subscribe((res: any) => {
      this.points = res.data.list;
      this.totalPoints = res.data.total_points;
    })
  }

}
