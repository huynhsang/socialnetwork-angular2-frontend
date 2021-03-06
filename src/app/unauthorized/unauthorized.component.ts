import { Component } from '@angular/core';

@Component({
    template: `<div class="container-fluid unauthorized">
  <div class="row">
    <div class="col-sm-12 col-md-6 col-lg-4 col-md-offset-3 col-lg-offset-4">
      <div class="panel panel-default">
        <div class="panel-body">
          <legend>
            <h2><i class="fa fa-exclamation-triangle"></i>403 Unauthorized</h2>
          </legend>
          <div class="well">
            <p>You are not authorized to view this page.  Please contact an administrator for details.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
})

export class UnauthorizedComponent{}