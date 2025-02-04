import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MonitoringPnNotificationRulesService} from '../../../services';
import {NotificationRuleSimpleModel} from '../../../models';

@Component({
  selector: 'app-monitoring-pn-notification-rules-delete',
  templateUrl: './notification-rules-delete.component.html',
  styleUrls: ['./notification-rules-delete.component.scss']
})
export class NotificationRulesDeleteComponent implements OnInit {
  @ViewChild('frame') frame;
  @Output() ruleDeleted: EventEmitter<void> = new EventEmitter<void>();
  spinnerStatus = false;
  ruleModel: NotificationRuleSimpleModel = new NotificationRuleSimpleModel();

  constructor(private monitoringPnRulesService: MonitoringPnNotificationRulesService) { }

  ngOnInit() {
  }

  show(ruleModel: NotificationRuleSimpleModel) {
    this.ruleModel = ruleModel;
    this.frame.show();
  }

  deleteRule() {
    this.spinnerStatus = true;
    this.monitoringPnRulesService.deleteRule(this.ruleModel.id).subscribe((data) => {
      if (data && data.success) {
        this.ruleDeleted.emit();
        this.frame.hide();
      }
      this.spinnerStatus = false;
    });
  }
}
