webpackJsonp([2],{

/***/ "../../../../../src/app/auth/services/authentication.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/index.js");
var http_1 = __webpack_require__("../../../http/index.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var config_service_1 = __webpack_require__("../../../../../src/app/shared/services/config.service.ts");
var HEADER = {
    headers: new http_1.Headers({
        'Content-Type': 'application/json'
    })
};
var AuthenticationService = (function () {
    function AuthenticationService(http, config) {
        this.http = http;
        this.config = config;
        this._baseUrl = '';
        this._baseUrl = config.getApiURI();
    }
    AuthenticationService.prototype.login = function (username, password) {
        var user = { username: username, password: password };
        return this.http.post(this._baseUrl + '/api/auth/login', JSON.stringify(user), HEADER)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            if (user) {
                // if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        var user = localStorage.getItem('currentUser');
        if (user)
            return true;
        else
            return false;
    };
    AuthenticationService.prototype.getUserName = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser)
            return currentUser.local.username;
        else
            return "";
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof config_service_1.ConfigService !== "undefined" && config_service_1.ConfigService) === "function" && _b || Object])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
var _a, _b;
//# sourceMappingURL=D:/Learning/DeployHeroku/how-do-you-do/src/authentication.service.js.map

/***/ }),

/***/ "../../../../../src/app/auth/services/loggedin.guard.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/index.js");
var router_1 = __webpack_require__("../../../router/index.js");
var authentication_service_1 = __webpack_require__("../../../../../src/app/auth/services/authentication.service.ts");
var LoggedInGuard = (function () {
    function LoggedInGuard(user, router) {
        this.user = user;
        this.router = router;
    }
    LoggedInGuard.prototype.canActivate = function () {
        if (!this.user.isLoggedIn()) {
            //this.router.navigate(['/charts']);
            console.log(' not loggin');
            this.router.navigate(['/pages/login']);
            return false;
        }
        // else
        // {
        //     this.router.navigate(['/pages/login']);
        // }
        return true;
    };
    return LoggedInGuard;
}());
LoggedInGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], LoggedInGuard);
exports.LoggedInGuard = LoggedInGuard;
var _a, _b;
//# sourceMappingURL=D:/Learning/DeployHeroku/how-do-you-do/src/loggedin.guard.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var loggedin_guard_1 = __webpack_require__("../../../../../src/app/auth/services/loggedin.guard.ts");
var core_1 = __webpack_require__("../../../core/index.js");
var router_1 = __webpack_require__("../../../router/index.js");
var dashboard_component_1 = __webpack_require__("../../../../../src/app/dashboard/dashboard.component.ts");
var routes = [
    {
        path: '',
        component: dashboard_component_1.DashboardComponent,
        data: {
            title: 'Dashboard'
        },
        canActivate: [loggedin_guard_1.LoggedInGuard]
    }
];
var DashboardRoutingModule = (function () {
    function DashboardRoutingModule() {
    }
    return DashboardRoutingModule;
}());
DashboardRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], DashboardRoutingModule);
exports.DashboardRoutingModule = DashboardRoutingModule;
//# sourceMappingURL=D:/Learning/DeployHeroku/how-do-you-do/src/dashboard-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6 col-lg-3\">\r\n      <div class=\"card card-inverse card-primary\">\r\n        <div class=\"card-block pb-0\">\r\n          <div class=\"btn-group float-right\" dropdown>\r\n            <button type=\"button\" class=\"btn btn-transparent dropdown-toggle p-0\" dropdownToggle>\r\n              <i class=\"icon-settings\"></i>\r\n            </button>\r\n            <div class=\"dropdown-menu dropdown-menu-right\" *dropdownMenu>\r\n              <a class=\"dropdown-item\" href=\"#\">Action</a>\r\n              <a class=\"dropdown-item\" href=\"#\">Another action</a>\r\n              <a class=\"dropdown-item\" href=\"#\">Something else here</a>\r\n            </div>\r\n          </div>\r\n          <h4 class=\"mb-0\">9.823</h4>\r\n          <p>Members online</p>\r\n        </div>\r\n        <div class=\"chart-wrapper px-1\" style=\"height:70px;\">\r\n          <canvas baseChart class=\"chart\"\r\n          [datasets]=\"lineChart1Data\"\r\n          [labels]=\"lineChart1Labels\"\r\n          [options]=\"lineChart1Options\"\r\n          [colors]=\"lineChart1Colours\"\r\n          [legend]=\"lineChart1Legend\"\r\n          [chartType]=\"lineChart1Type\"\r\n          (chartHover)=\"chartHovered($event)\"\r\n          (chartClick)=\"chartClicked($event)\"></canvas>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-lg-3\">\r\n      <div class=\"card card-inverse card-info\">\r\n        <div class=\"card-block pb-0\">\r\n          <button type=\"button\" class=\"btn btn-transparent p-0 float-right\">\r\n            <i class=\"icon-location-pin\"></i>\r\n          </button>\r\n          <h4 class=\"mb-0\">9.823</h4>\r\n          <p>Members online</p>\r\n        </div>\r\n        <div class=\"chart-wrapper px-1\" style=\"height:70px;\">\r\n          <canvas baseChart class=\"chart\"\r\n          [datasets]=\"lineChart2Data\"\r\n          [labels]=\"lineChart2Labels\"\r\n          [options]=\"lineChart2Options\"\r\n          [colors]=\"lineChart2Colours\"\r\n          [legend]=\"lineChart2Legend\"\r\n          [chartType]=\"lineChart2Type\"\r\n          (chartHover)=\"chartHovered($event)\"\r\n          (chartClick)=\"chartClicked($event)\"></canvas>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-lg-3\">\r\n      <div class=\"card card-inverse card-warning\">\r\n        <div class=\"card-block pb-0\">\r\n          <div class=\"btn-group float-right\">\r\n            <button type=\"button\" class=\"btn btn-transparent dropdown-toggle p-0\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n              <i class=\"icon-settings\"></i>\r\n            </button>\r\n            <div class=\"dropdown-menu dropdown-menu-right\">\r\n              <a class=\"dropdown-item\" href=\"#\">Action</a>\r\n              <a class=\"dropdown-item\" href=\"#\">Another action</a>\r\n              <a class=\"dropdown-item\" href=\"#\">Something else here</a>\r\n            </div>\r\n          </div>\r\n          <h4 class=\"mb-0\">9.823</h4>\r\n          <p>Members online</p>\r\n        </div>\r\n        <div class=\"chart-wrapper\" style=\"height:70px;\">\r\n          <canvas baseChart class=\"chart\"\r\n          [datasets]=\"lineChart3Data\"\r\n          [labels]=\"lineChart3Labels\"\r\n          [options]=\"lineChart3Options\"\r\n          [colors]=\"lineChart3Colours\"\r\n          [legend]=\"lineChart3Legend\"\r\n          [chartType]=\"lineChart3Type\"\r\n          (chartHover)=\"chartHovered($event)\"\r\n          (chartClick)=\"chartClicked($event)\"></canvas>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-lg-3\">\r\n      <div class=\"card card-inverse card-danger\">\r\n        <div class=\"card-block pb-0\">\r\n          <div class=\"btn-group float-right\" dropdown>\r\n            <button type=\"button\" class=\"btn btn-transparent dropdown-toggle p-0\" dropdownToggle>\r\n              <i class=\"icon-settings\"></i>\r\n            </button>\r\n            <div class=\"dropdown-menu dropdown-menu-right\" *dropdownMenu>\r\n              <a class=\"dropdown-item\" href=\"#\">Action</a>\r\n              <a class=\"dropdown-item\" href=\"#\">Another action</a>\r\n              <a class=\"dropdown-item\" href=\"#\">Something else here</a>\r\n            </div>\r\n          </div>\r\n          <h4 class=\"mb-0\">9.823</h4>\r\n          <p>Members online</p>\r\n        </div>\r\n        <div class=\"chart-wrapper px-1\" style=\"height:70px;\">\r\n          <canvas baseChart class=\"chart\"\r\n          [datasets]=\"barChart1Data\"\r\n          [labels]=\"barChart1Labels\"\r\n          [options]=\"barChart1Options\"\r\n          [colors]=\"barChart1Colours\"\r\n          [legend]=\"barChart1Legend\"\r\n          [chartType]=\"barChart1Type\"\r\n          (chartHover)=\"chartHovered($event)\"\r\n          (chartClick)=\"chartClicked($event)\"></canvas>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div class=\"card\">\r\n    <div class=\"card-block\">\r\n      <div class=\"row\">\r\n        <div class=\"col-sm-5\">\r\n          <h4 class=\"card-title mb-0\">Traffic</h4>\r\n          <div class=\"small text-muted\">November 2015</div>\r\n        </div><!--/.col-->\r\n        <div class=\"col-sm-7 hidden-sm-down\">\r\n          <button type=\"button\" class=\"btn btn-primary float-right\"><i class=\"icon-cloud-download\"></i></button>\r\n          <div class=\"btn-toolbar float-right\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\r\n            <div class=\"btn-group mr-1\" data-toggle=\"buttons\" aria-label=\"First group\">\r\n              <label class=\"btn btn-outline-secondary\">\r\n                <input type=\"radio\" name=\"options\" id=\"option1\"> Day\r\n              </label>\r\n              <label class=\"btn btn-outline-secondary active\">\r\n                <input type=\"radio\" name=\"options\" id=\"option2\" checked> Month\r\n              </label>\r\n              <label class=\"btn btn-outline-secondary\">\r\n                <input type=\"radio\" name=\"options\" id=\"option3\"> Year\r\n              </label>\r\n            </div>\r\n          </div>\r\n        </div><!--/.col-->\r\n      </div><!--/.row-->\r\n      <div class=\"chart-wrapper\" style=\"height:300px;margin-top:40px;\">\r\n        <canvas baseChart class=\"chart\"\r\n        [datasets]=\"mainChartData\"\r\n        [labels]=\"mainChartLabels\"\r\n        [options]=\"mainChartOptions\"\r\n        [colors]=\"mainChartColours\"\r\n        [legend]=\"mainChartLegend\"\r\n        [chartType]=\"mainChartType\"\r\n        (chartHover)=\"chartHovered($event)\"\r\n        (chartClick)=\"chartClicked($event)\"></canvas>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-footer\">\r\n      <ul>\r\n        <li>\r\n          <div class=\"text-muted\">Visits</div>\r\n          <strong>29.703 Users (40%)</strong>\r\n          <div class=\"progress progress-xs mt-h\">\r\n            <div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 40%\" aria-valuenow=\"40\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n          </div>\r\n        </li>\r\n        <li class=\"hidden-sm-down\">\r\n          <div class=\"text-muted\">Unique</div>\r\n          <strong>24.093 Users (20%)</strong>\r\n          <div class=\"progress progress-xs mt-h\">\r\n            <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 20%\" aria-valuenow=\"20\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n          </div>\r\n        </li>\r\n        <li>\r\n          <div class=\"text-muted\">Pageviews</div>\r\n          <strong>78.706 Views (60%)</strong>\r\n          <div class=\"progress progress-xs mt-h\">\r\n            <div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: 60%\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n          </div>\r\n        </li>\r\n        <li class=\"hidden-sm-down\">\r\n          <div class=\"text-muted\">New Users</div>\r\n          <strong>22.123 Users (80%)</strong>\r\n          <div class=\"progress progress-xs mt-h\">\r\n            <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 80%\" aria-valuenow=\"80\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n          </div>\r\n        </li>\r\n        <li class=\"hidden-sm-down\">\r\n          <div class=\"text-muted\">Bounce Rate</div>\r\n          <strong>40.15%</strong>\r\n          <div class=\"progress progress-xs mt-h\">\r\n            <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 40%\" aria-valuenow=\"40\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n          </div>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <!--/.card-->\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6 col-lg-3\">\r\n      <div class=\"social-box facebook\">\r\n        <i class=\"fa fa-facebook\"></i>\r\n        <div class=\"chart-wrapper\">\r\n          <canvas baseChart class=\"chart\"\r\n          [datasets]=\"socialChartData1\"\r\n          [labels]=\"socialChartLabels\"\r\n          [options]=\"socialChartOptions\"\r\n          [colors]=\"socialChartColours\"\r\n          [legend]=\"socialChartLegend\"\r\n          [chartType]=\"socialChartType\"\r\n          (chartHover)=\"chartHovered($event)\"\r\n          (chartClick)=\"chartClicked($event)\"></canvas>\r\n        </div>\r\n        <ul>\r\n          <li>\r\n            <strong>89k</strong>\r\n            <span>friends</span>\r\n          </li>\r\n          <li>\r\n            <strong>459</strong>\r\n            <span>feeds</span>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!--/.social-box-->\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-lg-3\">\r\n      <div class=\"social-box twitter\">\r\n        <i class=\"fa fa-twitter\"></i>\r\n        <div class=\"chart-wrapper\">\r\n          <canvas baseChart class=\"chart\"\r\n          [datasets]=\"socialChartData2\"\r\n          [labels]=\"socialChartLabels\"\r\n          [options]=\"socialChartOptions\"\r\n          [colors]=\"socialChartColours\"\r\n          [legend]=\"socialChartLegend\"\r\n          [chartType]=\"socialChartType\"\r\n          (chartHover)=\"chartHovered($event)\"\r\n          (chartClick)=\"chartClicked($event)\"></canvas>\r\n        </div>\r\n        <ul>\r\n          <li>\r\n            <strong>973k</strong>\r\n            <span>followers</span>\r\n          </li>\r\n          <li>\r\n            <strong>1.792</strong>\r\n            <span>tweets</span>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!--/.social-box-->\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-lg-3\">\r\n      <div class=\"social-box linkedin\">\r\n        <i class=\"fa fa-linkedin\"></i>\r\n        <div class=\"chart-wrapper\">\r\n          <canvas baseChart class=\"chart\"\r\n          [datasets]=\"socialChartData3\"\r\n          [labels]=\"socialChartLabels\"\r\n          [options]=\"socialChartOptions\"\r\n          [colors]=\"socialChartColours\"\r\n          [legend]=\"socialChartLegend\"\r\n          [chartType]=\"socialChartType\"\r\n          (chartHover)=\"chartHovered($event)\"\r\n          (chartClick)=\"chartClicked($event)\"></canvas>\r\n        </div>\r\n        <ul>\r\n          <li>\r\n            <strong>500+</strong>\r\n            <span>contacts</span>\r\n          </li>\r\n          <li>\r\n            <strong>292</strong>\r\n            <span>feeds</span>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!--/.social-box-->\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-lg-3\">\r\n      <div class=\"social-box google-plus\">\r\n        <i class=\"fa fa-google-plus\"></i>\r\n        <div class=\"chart-wrapper\">\r\n          <canvas baseChart class=\"chart\"\r\n          [datasets]=\"socialChartData4\"\r\n          [labels]=\"socialChartLabels\"\r\n          [options]=\"socialChartOptions\"\r\n          [colors]=\"socialChartColours\"\r\n          [legend]=\"socialChartLegend\"\r\n          [chartType]=\"socialChartType\"\r\n          (chartHover)=\"chartHovered($event)\"\r\n          (chartClick)=\"chartClicked($event)\"></canvas>\r\n        </div>\r\n        <ul>\r\n          <li>\r\n            <strong>894</strong>\r\n            <span>followers</span>\r\n          </li>\r\n          <li>\r\n            <strong>92</strong>\r\n            <span>circles</span>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!--/.social-box-->\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Traffic &amp; Sales\r\n        </div>\r\n        <div class=\"card-block\">\r\n          <div class=\"row\">\r\n            <div class=\"col-sm-12 col-lg-4\">\r\n              <div class=\"row\">\r\n                <div class=\"col-sm-6\">\r\n                  <div class=\"callout callout-info\">\r\n                    <small class=\"text-muted\">New Clients</small>\r\n                    <br>\r\n                    <strong class=\"h4\">9,123</strong>\r\n                    <div class=\"chart-wrapper\" style=\"width:100px;height:30px;\">\r\n                      <canvas baseChart class=\"chart\"\r\n                      [datasets]=\"sparklineChartData1\"\r\n                      [labels]=\"sparklineChartLabels\"\r\n                      [options]=\"sparklineChartOptions\"\r\n                      [colors]=\"sparklineChartInfo\"\r\n                      [legend]=\"sparklineChartLegend\"\r\n                      [chartType]=\"sparklineChartType\"\r\n                      (chartHover)=\"chartHovered($event)\"\r\n                      (chartClick)=\"chartClicked($event)\"></canvas>\r\n                    </div>\r\n                  </div>\r\n                </div><!--/.col-->\r\n                <div class=\"col-sm-6\">\r\n                  <div class=\"callout callout-danger\">\r\n                    <small class=\"text-muted\">Recuring Clients</small>\r\n                    <br>\r\n                    <strong class=\"h4\">22,643</strong>\r\n                    <div class=\"chart-wrapper\" style=\"width:100px;height:30px;\">\r\n                      <canvas baseChart class=\"chart\"\r\n                      [datasets]=\"sparklineChartData2\"\r\n                      [labels]=\"sparklineChartLabels\"\r\n                      [options]=\"sparklineChartOptions\"\r\n                      [colors]=\"sparklineChartDanger\"\r\n                      [legend]=\"sparklineChartLegend\"\r\n                      [chartType]=\"sparklineChartType\"\r\n                      (chartHover)=\"chartHovered($event)\"\r\n                      (chartClick)=\"chartClicked($event)\"></canvas>\r\n                    </div>\r\n                  </div>\r\n                </div><!--/.col-->\r\n              </div><!--/.row-->\r\n              <hr class=\"mt-0\">\r\n              <ul class=\"horizontal-bars\">\r\n                <li>\r\n                  <div class=\"title\">\r\n                    Monday\r\n                  </div>\r\n                  <div class=\"bars\">\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 34%\" aria-valuenow=\"34\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 78%\" aria-valuenow=\"78\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <div class=\"title\">\r\n                    Tuesday\r\n                  </div>\r\n                  <div class=\"bars\">\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 56%\" aria-valuenow=\"56\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 94%\" aria-valuenow=\"94\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <div class=\"title\">\r\n                    Wednesday\r\n                  </div>\r\n                  <div class=\"bars\">\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 12%\" aria-valuenow=\"12\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 67%\" aria-valuenow=\"67\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <div class=\"title\">\r\n                    Thursday\r\n                  </div>\r\n                  <div class=\"bars\">\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 43%\" aria-valuenow=\"43\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 91%\" aria-valuenow=\"91\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <div class=\"title\">\r\n                    Friday\r\n                  </div>\r\n                  <div class=\"bars\">\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 22%\" aria-valuenow=\"22\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 73%\" aria-valuenow=\"73\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <div class=\"title\">\r\n                    Saturday\r\n                  </div>\r\n                  <div class=\"bars\">\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 53%\" aria-valuenow=\"53\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 82%\" aria-valuenow=\"82\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <div class=\"title\">\r\n                    Sunday\r\n                  </div>\r\n                  <div class=\"bars\">\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 9%\" aria-valuenow=\"9\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 69%\" aria-valuenow=\"69\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                  </div>\r\n                </li>\r\n                <li class=\"legend\">\r\n                  <span class=\"badge badge-pill badge-info\"></span> <small>New clients</small> &nbsp; <span class=\"badge badge-pill badge-danger\"></span> <small>Recurring clients</small>\r\n                </li>\r\n              </ul>\r\n            </div><!--/.col-->\r\n            <div class=\"col-sm-6 col-lg-4\">\r\n              <div class=\"row\">\r\n                <div class=\"col-sm-6\">\r\n                  <div class=\"callout callout-warning\">\r\n                    <small class=\"text-muted\">Pageviews</small>\r\n                    <br>\r\n                    <strong class=\"h4\">78,623</strong>\r\n                    <div class=\"chart-wrapper\" style=\"width:100px;height:30px;\">\r\n                      <canvas baseChart class=\"chart\"\r\n                      [datasets]=\"sparklineChartData1\"\r\n                      [labels]=\"sparklineChartLabels\"\r\n                      [options]=\"sparklineChartOptions\"\r\n                      [colors]=\"sparklineChartWarning\"\r\n                      [legend]=\"sparklineChartLegend\"\r\n                      [chartType]=\"sparklineChartType\"\r\n                      (chartHover)=\"chartHovered($event)\"\r\n                      (chartClick)=\"chartClicked($event)\"></canvas>\r\n                    </div>\r\n                  </div>\r\n                </div><!--/.col-->\r\n                <div class=\"col-sm-6\">\r\n                  <div class=\"callout callout-success\">\r\n                    <small class=\"text-muted\">Organic</small>\r\n                    <br>\r\n                    <strong class=\"h4\">49,123</strong>\r\n                    <div class=\"chart-wrapper\" style=\"width:100px;height:30px;\">\r\n                      <canvas baseChart class=\"chart\"\r\n                      [datasets]=\"sparklineChartData2\"\r\n                      [labels]=\"sparklineChartLabels\"\r\n                      [options]=\"sparklineChartOptions\"\r\n                      [colors]=\"sparklineChartSuccess\"\r\n                      [legend]=\"sparklineChartLegend\"\r\n                      [chartType]=\"sparklineChartType\"\r\n                      (chartHover)=\"chartHovered($event)\"\r\n                      (chartClick)=\"chartClicked($event)\"></canvas>\r\n                    </div>\r\n                  </div>\r\n                </div><!--/.col-->\r\n              </div><!--/.row-->\r\n              <hr class=\"mt-0\">\r\n              <ul class=\"horizontal-bars type-2\">\r\n                <li>\r\n                  <i class=\"icon-user\"></i>\r\n                  <span class=\"title\">Male</span>\r\n                  <span class=\"value\">43%</span>\r\n                  <div class=\"bars\">\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: 43%\" aria-valuenow=\"43\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <i class=\"icon-user-female\"></i>\r\n                  <span class=\"title\">Female</span>\r\n                  <span class=\"value\">37%</span>\r\n                  <div class=\"bars\">\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: 37%\" aria-valuenow=\"37\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                  </div>\r\n                </li>\r\n                <li class=\"divider\"></li>\r\n                <li>\r\n                  <i class=\"icon-globe\"></i>\r\n                  <span class=\"title\">Organic Search</span>\r\n                  <span class=\"value\">191,235 <span class=\"text-muted small\">(56%)</span></span>\r\n                  <div class=\"bars\">\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 56%\" aria-valuenow=\"56\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <i class=\"icon-social-facebook\"></i>\r\n                  <span class=\"title\">Facebook</span>\r\n                  <span class=\"value\">51,223 <span class=\"text-muted small\">(15%)</span></span>\r\n                  <div class=\"bars\">\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 15%\" aria-valuenow=\"15\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <i class=\"icon-social-twitter\"></i>\r\n                  <span class=\"title\">Twitter</span>\r\n                  <span class=\"value\">37,564 <span class=\"text-muted small\">(11%)</span></span>\r\n                  <div class=\"bars\">\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 11%\" aria-valuenow=\"11\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <i class=\"icon-social-linkedin\"></i>\r\n                  <span class=\"title\">LinkedIn</span>\r\n                  <span class=\"value\">27,319 <span class=\"text-muted small\">(8%)</span></span>\r\n                  <div class=\"bars\">\r\n                    <div class=\"progress progress-xs\">\r\n                      <div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 8%\" aria-valuenow=\"8\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                    </div>\r\n                  </div>\r\n                </li>\r\n                <li class=\"divider text-center\">\r\n                  <button type=\"button\" class=\"btn btn-sm btn-link text-muted\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"show more\"><i class=\"icon-options\"></i></button>\r\n                </li>\r\n              </ul>\r\n            </div><!--/.col-->\r\n            <div class=\"col-sm-6 col-lg-4\">\r\n              <div class=\"row\">\r\n                <div class=\"col-sm-6\">\r\n                  <div class=\"callout\">\r\n                    <small class=\"text-muted\">CTR</small>\r\n                    <br>\r\n                    <strong class=\"h4\">23%</strong>\r\n                    <div class=\"chart-wrapper\" style=\"width:100px;height:30px;\">\r\n                      <canvas baseChart class=\"chart\"\r\n                      [datasets]=\"sparklineChartData1\"\r\n                      [labels]=\"sparklineChartLabels\"\r\n                      [options]=\"sparklineChartOptions\"\r\n                      [colors]=\"sparklineChartDefault\"\r\n                      [legend]=\"sparklineChartLegend\"\r\n                      [chartType]=\"sparklineChartType\"\r\n                      (chartHover)=\"chartHovered($event)\"\r\n                      (chartClick)=\"chartClicked($event)\"></canvas>\r\n                    </div>\r\n                  </div>\r\n                </div><!--/.col-->\r\n                <div class=\"col-sm-6\">\r\n                  <div class=\"callout callout-primary\">\r\n                    <small class=\"text-muted\">Bounce Rate</small>\r\n                    <br>\r\n                    <strong class=\"h4\">5%</strong>\r\n                    <div class=\"chart-wrapper\" style=\"width:100px;height:30px;\">\r\n                      <canvas baseChart class=\"chart\"\r\n                      [datasets]=\"sparklineChartData2\"\r\n                      [labels]=\"sparklineChartLabels\"\r\n                      [options]=\"sparklineChartOptions\"\r\n                      [colors]=\"sparklineChartPrimary\"\r\n                      [legend]=\"sparklineChartLegend\"\r\n                      [chartType]=\"sparklineChartType\"\r\n                      (chartHover)=\"chartHovered($event)\"\r\n                      (chartClick)=\"chartClicked($event)\"></canvas>\r\n                    </div>\r\n                  </div>\r\n                </div><!--/.col-->\r\n              </div><!--/.row-->\r\n              <hr class=\"mt-0\">\r\n              <ul class=\"icons-list\">\r\n                <li>\r\n                  <i class=\"icon-screen-desktop bg-primary\"></i>\r\n                  <div class=\"desc\">\r\n                    <div class=\"title\">iMac 4k</div>\r\n                    <small>Lorem ipsum dolor sit amet</small>\r\n                  </div>\r\n                  <div class=\"value\">\r\n                    <div class=\"small text-muted\">Sold this week</div>\r\n                    <strong>1.924</strong>\r\n                  </div>\r\n                  <div class=\"actions\">\r\n                    <button type=\"button\" class=\"btn btn-link text-muted\"><i class=\"icon-settings\"></i></button>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <i class=\"icon-screen-smartphone bg-info\"></i>\r\n                  <div class=\"desc\">\r\n                    <div class=\"title\">Samsung Galaxy Edge</div>\r\n                    <small>Lorem ipsum dolor sit amet</small>\r\n                  </div>\r\n                  <div class=\"value\">\r\n                    <div class=\"small text-muted\">Sold this week</div>\r\n                    <strong>1.224</strong>\r\n                  </div>\r\n                  <div class=\"actions\">\r\n                    <button type=\"button\" class=\"btn btn-link text-muted\"><i class=\"icon-settings\"></i></button>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <i class=\"icon-screen-smartphone bg-warning\"></i>\r\n                  <div class=\"desc\">\r\n                    <div class=\"title\">iPhone 6S</div>\r\n                    <small>Lorem ipsum dolor sit amet</small>\r\n                  </div>\r\n                  <div class=\"value\">\r\n                    <div class=\"small text-muted\">Sold this week</div>\r\n                    <strong>1.163</strong>\r\n                  </div>\r\n                  <div class=\"actions\">\r\n                    <button type=\"button\" class=\"btn btn-link text-muted\"><i class=\"icon-settings\"></i></button>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <i class=\"icon-user bg-danger\"></i>\r\n                  <div class=\"desc\">\r\n                    <div class=\"title\">Premium accounts</div>\r\n                    <small>Lorem ipsum dolor sit amet</small>\r\n                  </div>\r\n                  <div class=\"value\">\r\n                    <div class=\"small text-muted\">Sold this week</div>\r\n                    <strong>928</strong>\r\n                  </div>\r\n                  <div class=\"actions\">\r\n                    <button type=\"button\" class=\"btn btn-link text-muted\"><i class=\"icon-settings\"></i></button>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <i class=\"icon-social-spotify bg-success\"></i>\r\n                  <div class=\"desc\">\r\n                    <div class=\"title\">Spotify Subscriptions</div>\r\n                    <small>Lorem ipsum dolor sit amet</small>\r\n                  </div>\r\n                  <div class=\"value\">\r\n                    <div class=\"small text-muted\">Sold this week</div>\r\n                    <strong>893</strong>\r\n                  </div>\r\n                  <div class=\"actions\">\r\n                    <button type=\"button\" class=\"btn btn-link text-muted\"><i class=\"icon-settings\"></i></button>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <i class=\"icon-cloud-download bg-danger\"></i>\r\n                  <div class=\"desc\">\r\n                    <div class=\"title\">Ebook</div>\r\n                    <small>Lorem ipsum dolor sit amet</small>\r\n                  </div>\r\n                  <div class=\"value\">\r\n                    <div class=\"small text-muted\">Downloads</div>\r\n                    <strong>121.924</strong>\r\n                  </div>\r\n                  <div class=\"actions\">\r\n                    <button type=\"button\" class=\"btn btn-link text-muted\"><i class=\"icon-settings\"></i></button>\r\n                  </div>\r\n                </li>\r\n                <li>\r\n                  <i class=\"icon-camera bg-warning\"></i>\r\n                  <div class=\"desc\">\r\n                    <div class=\"title\">Photos</div>\r\n                    <small>Lorem ipsum dolor sit amet</small>\r\n                  </div>\r\n                  <div class=\"value\">\r\n                    <div class=\"small text-muted\">Uploaded</div>\r\n                    <strong>12.125</strong>\r\n                  </div>\r\n                  <div class=\"actions\">\r\n                    <button type=\"button\" class=\"btn btn-link text-muted\"><i class=\"icon-settings\"></i></button>\r\n                  </div>\r\n                </li>\r\n                <li class=\"divider text-center\">\r\n                  <button type=\"button\" class=\"btn btn-sm btn-link text-muted\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"show more\"><i class=\"icon-options\"></i></button>\r\n                </li>\r\n              </ul>\r\n            </div><!--/.col-->\r\n          </div><!--/.row-->\r\n          <br>\r\n          <table class=\"table table-hover table-outline mb-0 hidden-sm-down\">\r\n            <thead class=\"thead-default\">\r\n              <tr>\r\n                <th class=\"text-center\"><i class=\"icon-people\"></i></th>\r\n                <th>User</th>\r\n                <th class=\"text-center\">Country</th>\r\n                <th>Usage</th>\r\n                <th class=\"text-center\">Payment Method</th>\r\n                <th>Activity</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <td class=\"text-center\">\r\n                  <div class=\"avatar\">\r\n                    <img src=\"assets/img/avatars/1.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\" src=\"assets/img/avatars/1.jpg\">\r\n                    <span class=\"avatar-status badge-success\"></span>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div>Yiorgos Avraamu</div>\r\n                  <div class=\"small text-muted\">\r\n                    <span>New</span> | Registered: Jan 1, 2015\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-center\">\r\n                  <img src=\"assets/img/flags/USA.png\" alt=\"USA\" style=\"height:24px;\" src=\"assets/img/flags/USA.png\">\r\n                </td>\r\n                <td>\r\n                  <div class=\"clearfix\">\r\n                    <div class=\"float-left\">\r\n                      <strong>50%</strong>\r\n                    </div>\r\n                    <div class=\"float-right\">\r\n                      <small class=\"text-muted\">Jun 11, 2015 - Jul 10, 2015</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"progress progress-xs\">\r\n                    <div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 50%\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-center\">\r\n                  <i class=\"fa fa-cc-mastercard\" style=\"font-size:24px\"></i>\r\n                </td>\r\n                <td>\r\n                  <div class=\"small text-muted\">Last login</div>\r\n                  <strong>10 sec ago</strong>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td class=\"text-center\">\r\n                  <div class=\"avatar\">\r\n                    <img src=\"assets/img/avatars/2.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\" src=\"assets/img/avatars/2.jpg\">\r\n                    <span class=\"avatar-status badge-danger\"></span>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div>Avram Tarasios</div>\r\n                  <div class=\"small text-muted\">\r\n\r\n                    <span>Recurring</span> | Registered: Jan 1, 2015\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-center\">\r\n                  <img src=\"assets/img/flags/Brazil.png\" alt=\"Brazil\" style=\"height:24px;\" src=\"assets/img/flags/Brazil.png\">\r\n                </td>\r\n                <td>\r\n                  <div class=\"clearfix\">\r\n                    <div class=\"float-left\">\r\n                      <strong>10%</strong>\r\n                    </div>\r\n                    <div class=\"float-right\">\r\n                      <small class=\"text-muted\">Jun 11, 2015 - Jul 10, 2015</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"progress progress-xs\">\r\n                    <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 10%\" aria-valuenow=\"10\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-center\">\r\n                  <i class=\"fa fa-cc-visa\" style=\"font-size:24px\"></i>\r\n                </td>\r\n                <td>\r\n                  <div class=\"small text-muted\">Last login</div>\r\n                  <strong>5 minutes ago</strong>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td class=\"text-center\">\r\n                  <div class=\"avatar\">\r\n                    <img src=\"assets/img/avatars/3.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\" src=\"assets/img/avatars/3.jpg\">\r\n                    <span class=\"avatar-status badge-warning\"></span>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div>Quintin Ed</div>\r\n                  <div class=\"small text-muted\">\r\n                    <span>New</span> | Registered: Jan 1, 2015\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-center\">\r\n                  <img src=\"assets/img/flags/India.png\" alt=\"India\" style=\"height:24px;\" src=\"assets/img/flags/India.png\">\r\n                </td>\r\n                <td>\r\n                  <div class=\"clearfix\">\r\n                    <div class=\"float-left\">\r\n                      <strong>74%</strong>\r\n                    </div>\r\n                    <div class=\"float-right\">\r\n                      <small class=\"text-muted\">Jun 11, 2015 - Jul 10, 2015</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"progress progress-xs\">\r\n                    <div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: 74%\" aria-valuenow=\"74\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-center\">\r\n                  <i class=\"fa fa-cc-stripe\" style=\"font-size:24px\"></i>\r\n                </td>\r\n                <td>\r\n                  <div class=\"small text-muted\">Last login</div>\r\n                  <strong>1 hour ago</strong>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td class=\"text-center\">\r\n                  <div class=\"avatar\">\r\n                    <img src=\"assets/img/avatars/4.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\" src=\"assets/img/avatars/4.jpg\">\r\n                    <span class=\"avatar-status badge-default\"></span>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div>Enéas Kwadwo</div>\r\n                  <div class=\"small text-muted\">\r\n                    <span>New</span> | Registered: Jan 1, 2015\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-center\">\r\n                  <img src=\"assets/img/flags/France.png\" alt=\"France\" style=\"height:24px;\" src=\"assets/img/flags/France.png\">\r\n                </td>\r\n                <td>\r\n                  <div class=\"clearfix\">\r\n                    <div class=\"float-left\">\r\n                      <strong>98%</strong>\r\n                    </div>\r\n                    <div class=\"float-right\">\r\n                      <small class=\"text-muted\">Jun 11, 2015 - Jul 10, 2015</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"progress progress-xs\">\r\n                    <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 98%\" aria-valuenow=\"98\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-center\">\r\n                  <i class=\"fa fa-paypal\" style=\"font-size:24px\"></i>\r\n                </td>\r\n                <td>\r\n                  <div class=\"small text-muted\">Last login</div>\r\n                  <strong>Last month</strong>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td class=\"text-center\">\r\n                  <div class=\"avatar\">\r\n                    <img src=\"assets/img/avatars/5.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\" src=\"assets/img/avatars/5.jpg\">\r\n                    <span class=\"avatar-status badge-success\"></span>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div>Agapetus Tadeáš</div>\r\n                  <div class=\"small text-muted\">\r\n                    <span>New</span> | Registered: Jan 1, 2015\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-center\">\r\n                  <img src=\"assets/img/flags/Spain.png\" alt=\"Spain\" style=\"height:24px;\" src=\"assets/img/flags/Spain.png\">\r\n                </td>\r\n                <td>\r\n                  <div class=\"clearfix\">\r\n                    <div class=\"float-left\">\r\n                      <strong>22%</strong>\r\n                    </div>\r\n                    <div class=\"float-right\">\r\n                      <small class=\"text-muted\">Jun 11, 2015 - Jul 10, 2015</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"progress progress-xs\">\r\n                    <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 22%\" aria-valuenow=\"22\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-center\">\r\n                  <i class=\"fa fa-google-wallet\" style=\"font-size:24px\"></i>\r\n                </td>\r\n                <td>\r\n                  <div class=\"small text-muted\">Last login</div>\r\n                  <strong>Last week</strong>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td class=\"text-center\">\r\n                  <div class=\"avatar\">\r\n                    <img src=\"assets/img/avatars/6.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\" src=\"assets/img/avatars/6.jpg\">\r\n                    <span class=\"avatar-status badge-danger\"></span>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div>Friderik Dávid</div>\r\n                  <div class=\"small text-muted\">\r\n                    <span>New</span> | Registered: Jan 1, 2015\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-center\">\r\n                  <img src=\"assets/img/flags/Poland.png\" alt=\"Poland\" style=\"height:24px;\" src=\"assets/img/flags/Poland.png\">\r\n                </td>\r\n                <td>\r\n                  <div class=\"clearfix\">\r\n                    <div class=\"float-left\">\r\n                      <strong>43%</strong>\r\n                    </div>\r\n                    <div class=\"float-right\">\r\n                      <small class=\"text-muted\">Jun 11, 2015 - Jul 10, 2015</small>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"progress progress-xs\">\r\n                    <div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 43%\" aria-valuenow=\"43\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-center\">\r\n                  <i class=\"fa fa-cc-amex\" style=\"font-size:24px\"></i>\r\n                </td>\r\n                <td>\r\n                  <div class=\"small text-muted\">Last login</div>\r\n                  <strong>Yesterday</strong>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/index.js");
var DashboardComponent = (function () {
    function DashboardComponent() {
        // constructor( ) { }
        this.brandPrimary = '#20a8d8';
        this.brandSuccess = '#4dbd74';
        this.brandInfo = '#63c2de';
        this.brandWarning = '#f8cb00';
        this.brandDanger = '#f86c6b';
        // dropdown buttons
        this.status = { isopen: false };
        // lineChart1
        this.lineChart1Data = [
            {
                data: [65, 59, 84, 84, 51, 55, 40],
                label: 'Series A'
            }
        ];
        this.lineChart1Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart1Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        gridLines: {
                            color: 'transparent',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            fontSize: 2,
                            fontColor: 'transparent',
                        }
                    }],
                yAxes: [{
                        display: false,
                        ticks: {
                            display: false,
                            min: 40 - 5,
                            max: 84 + 5,
                        }
                    }],
            },
            elements: {
                line: {
                    borderWidth: 1
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                },
            },
            legend: {
                display: false
            }
        };
        this.lineChart1Colours = [
            {
                backgroundColor: this.brandPrimary,
                borderColor: 'rgba(255,255,255,.55)'
            }
        ];
        this.lineChart1Legend = false;
        this.lineChart1Type = 'line';
        // lineChart2
        this.lineChart2Data = [
            {
                data: [1, 18, 9, 17, 34, 22, 11],
                label: 'Series A'
            }
        ];
        this.lineChart2Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart2Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        gridLines: {
                            color: 'transparent',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            fontSize: 2,
                            fontColor: 'transparent',
                        }
                    }],
                yAxes: [{
                        display: false,
                        ticks: {
                            display: false,
                            min: 1 - 5,
                            max: 34 + 5,
                        }
                    }],
            },
            elements: {
                line: {
                    tension: 0.00001,
                    borderWidth: 1
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                },
            },
            legend: {
                display: false
            }
        };
        this.lineChart2Colours = [
            {
                backgroundColor: this.brandInfo,
                borderColor: 'rgba(255,255,255,.55)'
            }
        ];
        this.lineChart2Legend = false;
        this.lineChart2Type = 'line';
        // lineChart3
        this.lineChart3Data = [
            {
                data: [78, 81, 80, 45, 34, 12, 40],
                label: 'Series A'
            }
        ];
        this.lineChart3Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart3Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false
                    }],
                yAxes: [{
                        display: false
                    }]
            },
            elements: {
                line: {
                    borderWidth: 2
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                },
            },
            legend: {
                display: false
            }
        };
        this.lineChart3Colours = [
            {
                backgroundColor: 'rgba(255,255,255,.2)',
                borderColor: 'rgba(255,255,255,.55)',
            }
        ];
        this.lineChart3Legend = false;
        this.lineChart3Type = 'line';
        // barChart1
        this.barChart1Data = [
            {
                data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
                label: 'Series A'
            }
        ];
        this.barChart1Labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
        this.barChart1Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false,
                        barPercentage: 0.6,
                    }],
                yAxes: [{
                        display: false
                    }]
            },
            legend: {
                display: false
            }
        };
        this.barChart1Colours = [
            {
                backgroundColor: 'rgba(255,255,255,.3)',
                borderWidth: 0
            }
        ];
        this.barChart1Legend = false;
        this.barChart1Type = 'bar';
        this.mainChartElements = 27;
        this.mainChartData1 = [];
        this.mainChartData2 = [];
        this.mainChartData3 = [];
        this.mainChartData = [
            {
                data: this.mainChartData1,
                label: 'Current'
            },
            {
                data: this.mainChartData2,
                label: 'Previous'
            },
            {
                data: this.mainChartData3,
                label: 'BEP'
            }
        ];
        this.mainChartLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.mainChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        gridLines: {
                            drawOnChartArea: false,
                        },
                        ticks: {
                            callback: function (value) {
                                return value.charAt(0);
                            }
                        }
                    }],
                yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            stepSize: Math.ceil(250 / 5),
                            max: 250
                        }
                    }]
            },
            elements: {
                line: {
                    borderWidth: 2
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                }
            },
            legend: {
                display: false
            }
        };
        this.mainChartColours = [
            {
                backgroundColor: this.convertHex(this.brandInfo, 10),
                borderColor: this.brandInfo,
                pointHoverBackgroundColor: '#fff'
            },
            {
                backgroundColor: 'transparent',
                borderColor: this.brandSuccess,
                pointHoverBackgroundColor: '#fff'
            },
            {
                backgroundColor: 'transparent',
                borderColor: this.brandDanger,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 1,
                borderDash: [8, 5]
            }
        ];
        this.mainChartLegend = false;
        this.mainChartType = 'line';
        // social box charts
        this.socialChartData1 = [
            {
                data: [65, 59, 84, 84, 51, 55, 40],
                label: 'Facebook'
            }
        ];
        this.socialChartData2 = [
            {
                data: [1, 13, 9, 17, 34, 41, 38],
                label: 'Twitter'
            }
        ];
        this.socialChartData3 = [
            {
                data: [78, 81, 80, 45, 34, 12, 40],
                label: 'LinkedIn'
            }
        ];
        this.socialChartData4 = [
            {
                data: [35, 23, 56, 22, 97, 23, 64],
                label: 'Google+'
            }
        ];
        this.socialChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.socialChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false,
                    }],
                yAxes: [{
                        display: false,
                    }]
            },
            elements: {
                line: {
                    borderWidth: 2
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                }
            },
            legend: {
                display: false
            }
        };
        this.socialChartColours = [
            {
                backgroundColor: 'rgba(255,255,255,.1)',
                borderColor: 'rgba(255,255,255,.55)',
                pointHoverBackgroundColor: '#fff'
            }
        ];
        this.socialChartLegend = false;
        this.socialChartType = 'line';
        // sparkline charts
        this.sparklineChartData1 = [
            {
                data: [35, 23, 56, 22, 97, 23, 64],
                label: 'Clients'
            }
        ];
        this.sparklineChartData2 = [
            {
                data: [65, 59, 84, 84, 51, 55, 40],
                label: 'Clients'
            }
        ];
        this.sparklineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.sparklineChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false,
                    }],
                yAxes: [{
                        display: false,
                    }]
            },
            elements: {
                line: {
                    borderWidth: 2
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                }
            },
            legend: {
                display: false
            }
        };
        this.sparklineChartDefault = [
            {
                backgroundColor: 'transparent',
                borderColor: '#d1d4d7',
            }
        ];
        this.sparklineChartPrimary = [
            {
                backgroundColor: 'transparent',
                borderColor: this.brandPrimary,
            }
        ];
        this.sparklineChartInfo = [
            {
                backgroundColor: 'transparent',
                borderColor: this.brandInfo,
            }
        ];
        this.sparklineChartDanger = [
            {
                backgroundColor: 'transparent',
                borderColor: this.brandDanger,
            }
        ];
        this.sparklineChartWarning = [
            {
                backgroundColor: 'transparent',
                borderColor: this.brandWarning,
            }
        ];
        this.sparklineChartSuccess = [
            {
                backgroundColor: 'transparent',
                borderColor: this.brandSuccess,
            }
        ];
        this.sparklineChartLegend = false;
        this.sparklineChartType = 'line';
    }
    DashboardComponent.prototype.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    };
    // convert Hex to RGBA
    DashboardComponent.prototype.convertHex = function (hex, opacity) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        var rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
        return rgba;
    };
    // events
    DashboardComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    DashboardComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    // mainChart
    DashboardComponent.prototype.random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    DashboardComponent.prototype.ngOnInit = function () {
        // generate random values for mainChart
        for (var i = 0; i <= this.mainChartElements; i++) {
            this.mainChartData1.push(this.random(50, 200));
            this.mainChartData2.push(this.random(80, 100));
            this.mainChartData3.push(65);
        }
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        template: __webpack_require__("../../../../../src/app/dashboard/dashboard.component.html")
    })
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=D:/Learning/DeployHeroku/how-do-you-do/src/dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var loggedin_guard_1 = __webpack_require__("../../../../../src/app/auth/services/loggedin.guard.ts");
var authentication_service_1 = __webpack_require__("../../../../../src/app/auth/services/authentication.service.ts");
var core_1 = __webpack_require__("../../../core/index.js");
var ng2_charts_1 = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
var dropdown_1 = __webpack_require__("../../../../ng2-bootstrap/dropdown/index.js");
var dashboard_component_1 = __webpack_require__("../../../../../src/app/dashboard/dashboard.component.ts");
var dashboard_routing_module_1 = __webpack_require__("../../../../../src/app/dashboard/dashboard-routing.module.ts");
var http_1 = __webpack_require__("../../../http/index.js");
var config_service_1 = __webpack_require__("../../../../../src/app/shared/services/config.service.ts");
var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __decorate([
    core_1.NgModule({
        imports: [
            dashboard_routing_module_1.DashboardRoutingModule,
            ng2_charts_1.ChartsModule,
            dropdown_1.BsDropdownModule,
            http_1.HttpModule
        ],
        declarations: [dashboard_component_1.DashboardComponent],
        providers: [authentication_service_1.AuthenticationService, loggedin_guard_1.LoggedInGuard, config_service_1.ConfigService]
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=D:/Learning/DeployHeroku/how-do-you-do/src/dashboard.module.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/config.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/index.js");
var ConfigService = (function () {
    function ConfigService() {
        this._apiURI = 'http://localhost:3000';
    }
    ConfigService.prototype.getApiURI = function () {
        return this._apiURI;
    };
    return ConfigService;
}());
ConfigService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=D:/Learning/DeployHeroku/how-do-you-do/src/config.service.js.map

/***/ }),

/***/ "../../../../rxjs/add/operator/map.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__("../../../../rxjs/Observable.js");
var map_1 = __webpack_require__("../../../../rxjs/operator/map.js");
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "../../../http/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index__ = __webpack_require__("../../../http/src/index.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserXhr", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "JSONPBackend", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "JSONPConnection", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CookieXSRFStrategy", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "XHRBackend", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "XHRConnection", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BaseRequestOptions", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RequestOptions", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BaseResponseOptions", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ResponseOptions", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ReadyState", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RequestMethod", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ResponseContentType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ResponseType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["o"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Http", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Jsonp", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HttpModule", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "JsonpModule", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["s"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Connection", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["t"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionBackend", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["u"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "XSRFStrategy", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["v"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["w"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["x"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "QueryEncoder", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["y"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "URLSearchParams", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["z"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["A"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the http package.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../http/src/backends/browser_jsonp.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/index.js");
/* unused harmony export JSONP_HOME */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrowserJsonp; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var /** @type {?} */ _nextRequestId = 0;
var /** @type {?} */ JSONP_HOME = '__ng_jsonp__';
var /** @type {?} */ _jsonpConnections = null;
/**
 * @return {?}
 */
function _getJsonpConnections() {
    var /** @type {?} */ w = typeof window == 'object' ? window : {};
    if (_jsonpConnections === null) {
        _jsonpConnections = w[JSONP_HOME] = {};
    }
    return _jsonpConnections;
}
var BrowserJsonp = (function () {
    function BrowserJsonp() {
    }
    /**
     * @param {?} url
     * @return {?}
     */
    BrowserJsonp.prototype.build = function (url) {
        var /** @type {?} */ node = document.createElement('script');
        node.src = url;
        return node;
    };
    /**
     * @return {?}
     */
    BrowserJsonp.prototype.nextRequestID = function () { return "__req" + _nextRequestId++; };
    /**
     * @param {?} id
     * @return {?}
     */
    BrowserJsonp.prototype.requestCallback = function (id) { return JSONP_HOME + "." + id + ".finished"; };
    /**
     * @param {?} id
     * @param {?} connection
     * @return {?}
     */
    BrowserJsonp.prototype.exposeConnection = function (id, connection) {
        var /** @type {?} */ connections = _getJsonpConnections();
        connections[id] = connection;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    BrowserJsonp.prototype.removeConnection = function (id) {
        var /** @type {?} */ connections = _getJsonpConnections();
        connections[id] = null;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    BrowserJsonp.prototype.send = function (node) { document.body.appendChild(/** @type {?} */ ((node))); };
    /**
     * @param {?} node
     * @return {?}
     */
    BrowserJsonp.prototype.cleanup = function (node) {
        if (node.parentNode) {
            node.parentNode.removeChild(/** @type {?} */ ((node)));
        }
    };
    BrowserJsonp.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    BrowserJsonp.ctorParameters = function () { return []; };
    return BrowserJsonp;
}());
function BrowserJsonp_tsickle_Closure_declarations() {
    /** @type {?} */
    BrowserJsonp.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    BrowserJsonp.ctorParameters;
}
//# sourceMappingURL=browser_jsonp.js.map

/***/ }),

/***/ "../../../http/src/backends/browser_xhr.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrowserXhr; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * A backend for http that uses the `XMLHttpRequest` browser API.
 *
 * Take care not to evaluate this in non-browser contexts.
 *
 * \@experimental
 */
var BrowserXhr = (function () {
    function BrowserXhr() {
    }
    /**
     * @return {?}
     */
    BrowserXhr.prototype.build = function () { return ((new XMLHttpRequest())); };
    BrowserXhr.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    BrowserXhr.ctorParameters = function () { return []; };
    return BrowserXhr;
}());
function BrowserXhr_tsickle_Closure_declarations() {
    /** @type {?} */
    BrowserXhr.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    BrowserXhr.ctorParameters;
}
//# sourceMappingURL=browser_xhr.js.map

/***/ }),

/***/ "../../../http/src/backends/jsonp_backend.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_response_options__ = __webpack_require__("../../../http/src/base_response_options.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enums__ = __webpack_require__("../../../http/src/enums.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interfaces__ = __webpack_require__("../../../http/src/interfaces.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__static_response__ = __webpack_require__("../../../http/src/static_response.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__browser_jsonp__ = __webpack_require__("../../../http/src/backends/browser_jsonp.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return JSONPConnection; });
/* unused harmony export JSONPConnection_ */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JSONPBackend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return JSONPBackend_; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};







var /** @type {?} */ JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
var /** @type {?} */ JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
/**
 * Abstract base class for an in-flight JSONP request.
 *
 * \@experimental
 * @abstract
 */
var JSONPConnection = (function () {
    function JSONPConnection() {
    }
    /**
     * Callback called when the JSONP request completes, to notify the application
     * of the new data.
     * @abstract
     * @param {?=} data
     * @return {?}
     */
    JSONPConnection.prototype.finished = function (data) { };
    return JSONPConnection;
}());
function JSONPConnection_tsickle_Closure_declarations() {
    /**
     * The {\@link ReadyState} of this request.
     * @type {?}
     */
    JSONPConnection.prototype.readyState;
    /**
     * The outgoing HTTP request.
     * @type {?}
     */
    JSONPConnection.prototype.request;
    /**
     * An observable that completes with the response, when the request is finished.
     * @type {?}
     */
    JSONPConnection.prototype.response;
}
var JSONPConnection_ = (function (_super) {
    __extends(JSONPConnection_, _super);
    /**
     * @param {?} req
     * @param {?} _dom
     * @param {?=} baseResponseOptions
     */
    function JSONPConnection_(req, _dom, baseResponseOptions) {
        var _this = this;
        _super.call(this);
        this._dom = _dom;
        this.baseResponseOptions = baseResponseOptions;
        this._finished = false;
        if (req.method !== __WEBPACK_IMPORTED_MODULE_3__enums__["b" /* RequestMethod */].Get) {
            throw new TypeError(JSONP_ERR_WRONG_METHOD);
        }
        this.request = req;
        this.response = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (responseObserver) {
            _this.readyState = __WEBPACK_IMPORTED_MODULE_3__enums__["a" /* ReadyState */].Loading;
            var id = _this._id = _dom.nextRequestID();
            _dom.exposeConnection(id, _this);
            // Workaround Dart
            // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
            var callback = _dom.requestCallback(_this._id);
            var url = req.url;
            if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                url = url.replace('=JSONP_CALLBACK&', "=" + callback + "&");
            }
            else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
            }
            var script = _this._script = _dom.build(url);
            var onLoad = function (event) {
                if (_this.readyState === __WEBPACK_IMPORTED_MODULE_3__enums__["a" /* ReadyState */].Cancelled)
                    return;
                _this.readyState = __WEBPACK_IMPORTED_MODULE_3__enums__["a" /* ReadyState */].Done;
                _dom.cleanup(script);
                if (!_this._finished) {
                    var responseOptions_1 = new __WEBPACK_IMPORTED_MODULE_2__base_response_options__["b" /* ResponseOptions */]({ body: JSONP_ERR_NO_CALLBACK, type: __WEBPACK_IMPORTED_MODULE_3__enums__["d" /* ResponseType */].Error, url: url });
                    if (baseResponseOptions) {
                        responseOptions_1 = baseResponseOptions.merge(responseOptions_1);
                    }
                    responseObserver.error(new __WEBPACK_IMPORTED_MODULE_5__static_response__["a" /* Response */](responseOptions_1));
                    return;
                }
                var responseOptions = new __WEBPACK_IMPORTED_MODULE_2__base_response_options__["b" /* ResponseOptions */]({ body: _this._responseData, url: url });
                if (_this.baseResponseOptions) {
                    responseOptions = _this.baseResponseOptions.merge(responseOptions);
                }
                responseObserver.next(new __WEBPACK_IMPORTED_MODULE_5__static_response__["a" /* Response */](responseOptions));
                responseObserver.complete();
            };
            var onError = function (error) {
                if (_this.readyState === __WEBPACK_IMPORTED_MODULE_3__enums__["a" /* ReadyState */].Cancelled)
                    return;
                _this.readyState = __WEBPACK_IMPORTED_MODULE_3__enums__["a" /* ReadyState */].Done;
                _dom.cleanup(script);
                var responseOptions = new __WEBPACK_IMPORTED_MODULE_2__base_response_options__["b" /* ResponseOptions */]({ body: error.message, type: __WEBPACK_IMPORTED_MODULE_3__enums__["d" /* ResponseType */].Error });
                if (baseResponseOptions) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new __WEBPACK_IMPORTED_MODULE_5__static_response__["a" /* Response */](responseOptions));
            };
            script.addEventListener('load', onLoad);
            script.addEventListener('error', onError);
            _dom.send(script);
            return function () {
                _this.readyState = __WEBPACK_IMPORTED_MODULE_3__enums__["a" /* ReadyState */].Cancelled;
                script.removeEventListener('load', onLoad);
                script.removeEventListener('error', onError);
                _this._dom.cleanup(script);
            };
        });
    }
    /**
     * @param {?=} data
     * @return {?}
     */
    JSONPConnection_.prototype.finished = function (data) {
        // Don't leak connections
        this._finished = true;
        this._dom.removeConnection(this._id);
        if (this.readyState === __WEBPACK_IMPORTED_MODULE_3__enums__["a" /* ReadyState */].Cancelled)
            return;
        this._responseData = data;
    };
    return JSONPConnection_;
}(JSONPConnection));
function JSONPConnection__tsickle_Closure_declarations() {
    /** @type {?} */
    JSONPConnection_.prototype._id;
    /** @type {?} */
    JSONPConnection_.prototype._script;
    /** @type {?} */
    JSONPConnection_.prototype._responseData;
    /** @type {?} */
    JSONPConnection_.prototype._finished;
    /** @type {?} */
    JSONPConnection_.prototype._dom;
    /** @type {?} */
    JSONPConnection_.prototype.baseResponseOptions;
}
/**
 * A {\@link ConnectionBackend} that uses the JSONP strategy of making requests.
 *
 * \@experimental
 * @abstract
 */
var JSONPBackend = (function (_super) {
    __extends(JSONPBackend, _super);
    function JSONPBackend() {
        _super.apply(this, arguments);
    }
    return JSONPBackend;
}(__WEBPACK_IMPORTED_MODULE_4__interfaces__["b" /* ConnectionBackend */]));
var JSONPBackend_ = (function (_super) {
    __extends(JSONPBackend_, _super);
    /**
     * @param {?} _browserJSONP
     * @param {?} _baseResponseOptions
     */
    function JSONPBackend_(_browserJSONP, _baseResponseOptions) {
        _super.call(this);
        this._browserJSONP = _browserJSONP;
        this._baseResponseOptions = _baseResponseOptions;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    JSONPBackend_.prototype.createConnection = function (request) {
        return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
    };
    JSONPBackend_.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    JSONPBackend_.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_6__browser_jsonp__["a" /* BrowserJsonp */], },
        { type: __WEBPACK_IMPORTED_MODULE_2__base_response_options__["b" /* ResponseOptions */], },
    ]; };
    return JSONPBackend_;
}(JSONPBackend));
function JSONPBackend__tsickle_Closure_declarations() {
    /** @type {?} */
    JSONPBackend_.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JSONPBackend_.ctorParameters;
    /** @type {?} */
    JSONPBackend_.prototype._browserJSONP;
    /** @type {?} */
    JSONPBackend_.prototype._baseResponseOptions;
}
//# sourceMappingURL=jsonp_backend.js.map

/***/ }),

/***/ "../../../http/src/backends/xhr_backend.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_response_options__ = __webpack_require__("../../../http/src/base_response_options.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enums__ = __webpack_require__("../../../http/src/enums.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__headers__ = __webpack_require__("../../../http/src/headers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__http_utils__ = __webpack_require__("../../../http/src/http_utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__interfaces__ = __webpack_require__("../../../http/src/interfaces.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__static_response__ = __webpack_require__("../../../http/src/static_response.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__browser_xhr__ = __webpack_require__("../../../http/src/backends/browser_xhr.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return XHRConnection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CookieXSRFStrategy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return XHRBackend; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */










var /** @type {?} */ XSSI_PREFIX = /^\)\]\}',?\n/;
/**
 * Creates connections using `XMLHttpRequest`. Given a fully-qualified
 * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
 * request.
 *
 * This class would typically not be created or interacted with directly inside applications, though
 * the {\@link MockConnection} may be interacted with in tests.
 *
 * \@experimental
 */
var XHRConnection = (function () {
    /**
     * @param {?} req
     * @param {?} browserXHR
     * @param {?=} baseResponseOptions
     */
    function XHRConnection(req, browserXHR, baseResponseOptions) {
        var _this = this;
        this.request = req;
        this.response = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (responseObserver) {
            var _xhr = browserXHR.build();
            _xhr.open(__WEBPACK_IMPORTED_MODULE_4__enums__["b" /* RequestMethod */][req.method].toUpperCase(), req.url);
            if (req.withCredentials != null) {
                _xhr.withCredentials = req.withCredentials;
            }
            // load event handler
            var onLoad = function () {
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                var status = _xhr.status === 1223 ? 204 : _xhr.status;
                var body = null;
                // HTTP 204 means no content
                if (status !== 204) {
                    // responseText is the old-school way of retrieving response (supported by IE8 & 9)
                    // response/responseType properties were introduced in ResourceLoader Level2 spec
                    // (supported by IE10)
                    body = (typeof _xhr.response === 'undefined') ? _xhr.responseText : _xhr.response;
                    // Implicitly strip a potential XSSI prefix.
                    if (typeof body === 'string') {
                        body = body.replace(XSSI_PREFIX, '');
                    }
                }
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status === 0) {
                    status = body ? 200 : 0;
                }
                var headers = __WEBPACK_IMPORTED_MODULE_5__headers__["a" /* Headers */].fromResponseHeaderString(_xhr.getAllResponseHeaders());
                // IE 9 does not provide the way to get URL of response
                var url = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__http_utils__["c" /* getResponseURL */])(_xhr) || req.url;
                var statusText = _xhr.statusText || 'OK';
                var responseOptions = new __WEBPACK_IMPORTED_MODULE_3__base_response_options__["b" /* ResponseOptions */]({ body: body, status: status, headers: headers, statusText: statusText, url: url });
                if (baseResponseOptions != null) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                var response = new __WEBPACK_IMPORTED_MODULE_8__static_response__["a" /* Response */](responseOptions);
                response.ok = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__http_utils__["d" /* isSuccess */])(status);
                if (response.ok) {
                    responseObserver.next(response);
                    // TODO(gdi2290): defer complete if array buffer until done
                    responseObserver.complete();
                    return;
                }
                responseObserver.error(response);
            };
            // error event handler
            var onError = function (err) {
                var responseOptions = new __WEBPACK_IMPORTED_MODULE_3__base_response_options__["b" /* ResponseOptions */]({
                    body: err,
                    type: __WEBPACK_IMPORTED_MODULE_4__enums__["d" /* ResponseType */].Error,
                    status: _xhr.status,
                    statusText: _xhr.statusText,
                });
                if (baseResponseOptions != null) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new __WEBPACK_IMPORTED_MODULE_8__static_response__["a" /* Response */](responseOptions));
            };
            _this.setDetectedContentType(req, _xhr);
            if (req.headers == null) {
                req.headers = new __WEBPACK_IMPORTED_MODULE_5__headers__["a" /* Headers */]();
            }
            if (!req.headers.has('Accept')) {
                req.headers.append('Accept', 'application/json, text/plain, */*');
            }
            req.headers.forEach(function (values, name) { return _xhr.setRequestHeader(name, values.join(',')); });
            // Select the correct buffer type to store the response
            if (req.responseType != null && _xhr.responseType != null) {
                switch (req.responseType) {
                    case __WEBPACK_IMPORTED_MODULE_4__enums__["c" /* ResponseContentType */].ArrayBuffer:
                        _xhr.responseType = 'arraybuffer';
                        break;
                    case __WEBPACK_IMPORTED_MODULE_4__enums__["c" /* ResponseContentType */].Json:
                        _xhr.responseType = 'json';
                        break;
                    case __WEBPACK_IMPORTED_MODULE_4__enums__["c" /* ResponseContentType */].Text:
                        _xhr.responseType = 'text';
                        break;
                    case __WEBPACK_IMPORTED_MODULE_4__enums__["c" /* ResponseContentType */].Blob:
                        _xhr.responseType = 'blob';
                        break;
                    default:
                        throw new Error('The selected responseType is not supported');
                }
            }
            _xhr.addEventListener('load', onLoad);
            _xhr.addEventListener('error', onError);
            _xhr.send(_this.request.getBody());
            return function () {
                _xhr.removeEventListener('load', onLoad);
                _xhr.removeEventListener('error', onError);
                _xhr.abort();
            };
        });
    }
    /**
     * @param {?} req
     * @param {?} _xhr
     * @return {?}
     */
    XHRConnection.prototype.setDetectedContentType = function (req /** TODO Request */, _xhr /** XMLHttpRequest */) {
        // Skip if a custom Content-Type header is provided
        if (req.headers != null && req.headers.get('Content-Type') != null) {
            return;
        }
        // Set the detected content type
        switch (req.contentType) {
            case __WEBPACK_IMPORTED_MODULE_4__enums__["e" /* ContentType */].NONE:
                break;
            case __WEBPACK_IMPORTED_MODULE_4__enums__["e" /* ContentType */].JSON:
                _xhr.setRequestHeader('content-type', 'application/json');
                break;
            case __WEBPACK_IMPORTED_MODULE_4__enums__["e" /* ContentType */].FORM:
                _xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
                break;
            case __WEBPACK_IMPORTED_MODULE_4__enums__["e" /* ContentType */].TEXT:
                _xhr.setRequestHeader('content-type', 'text/plain');
                break;
            case __WEBPACK_IMPORTED_MODULE_4__enums__["e" /* ContentType */].BLOB:
                var /** @type {?} */ blob = req.blob();
                if (blob.type) {
                    _xhr.setRequestHeader('content-type', blob.type);
                }
                break;
        }
    };
    return XHRConnection;
}());
function XHRConnection_tsickle_Closure_declarations() {
    /** @type {?} */
    XHRConnection.prototype.request;
    /**
     * Response {\@link EventEmitter} which emits a single {\@link Response} value on load event of
     * `XMLHttpRequest`.
     * @type {?}
     */
    XHRConnection.prototype.response;
    /** @type {?} */
    XHRConnection.prototype.readyState;
}
/**
 * `XSRFConfiguration` sets up Cross Site Request Forgery (XSRF) protection for the application
 * using a cookie. See https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)
 * for more information on XSRF.
 *
 * Applications can configure custom cookie and header names by binding an instance of this class
 * with different `cookieName` and `headerName` values. See the main HTTP documentation for more
 * details.
 *
 * \@experimental
 */
var CookieXSRFStrategy = (function () {
    /**
     * @param {?=} _cookieName
     * @param {?=} _headerName
     */
    function CookieXSRFStrategy(_cookieName, _headerName) {
        if (_cookieName === void 0) { _cookieName = 'XSRF-TOKEN'; }
        if (_headerName === void 0) { _headerName = 'X-XSRF-TOKEN'; }
        this._cookieName = _cookieName;
        this._headerName = _headerName;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    CookieXSRFStrategy.prototype.configureRequest = function (req) {
        var /** @type {?} */ xsrfToken = __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["__platform_browser_private__"].getDOM().getCookie(this._cookieName);
        if (xsrfToken) {
            req.headers.set(this._headerName, xsrfToken);
        }
    };
    return CookieXSRFStrategy;
}());
function CookieXSRFStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    CookieXSRFStrategy.prototype._cookieName;
    /** @type {?} */
    CookieXSRFStrategy.prototype._headerName;
}
/**
 * Creates {\@link XHRConnection} instances.
 *
 * This class would typically not be used by end users, but could be
 * overridden if a different backend implementation should be used,
 * such as in a node backend.
 *
 * ### Example
 *
 * ```
 * import {Http, MyNodeBackend, HTTP_PROVIDERS, BaseRequestOptions} from '\@angular/http';
 * \@Component({
 *   viewProviders: [
 *     HTTP_PROVIDERS,
 *     {provide: Http, useFactory: (backend, options) => {
 *       return new Http(backend, options);
 *     }, deps: [MyNodeBackend, BaseRequestOptions]}]
 * })
 * class MyComponent {
 *   constructor(http:Http) {
 *     http.request('people.json').subscribe(res => this.people = res.json());
 *   }
 * }
 * ```
 * \@experimental
 */
var XHRBackend = (function () {
    /**
     * @param {?} _browserXHR
     * @param {?} _baseResponseOptions
     * @param {?} _xsrfStrategy
     */
    function XHRBackend(_browserXHR, _baseResponseOptions, _xsrfStrategy) {
        this._browserXHR = _browserXHR;
        this._baseResponseOptions = _baseResponseOptions;
        this._xsrfStrategy = _xsrfStrategy;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    XHRBackend.prototype.createConnection = function (request) {
        this._xsrfStrategy.configureRequest(request);
        return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
    };
    XHRBackend.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    XHRBackend.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_9__browser_xhr__["a" /* BrowserXhr */], },
        { type: __WEBPACK_IMPORTED_MODULE_3__base_response_options__["b" /* ResponseOptions */], },
        { type: __WEBPACK_IMPORTED_MODULE_7__interfaces__["c" /* XSRFStrategy */], },
    ]; };
    return XHRBackend;
}());
function XHRBackend_tsickle_Closure_declarations() {
    /** @type {?} */
    XHRBackend.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    XHRBackend.ctorParameters;
    /** @type {?} */
    XHRBackend.prototype._browserXHR;
    /** @type {?} */
    XHRBackend.prototype._baseResponseOptions;
    /** @type {?} */
    XHRBackend.prototype._xsrfStrategy;
}
//# sourceMappingURL=xhr_backend.js.map

/***/ }),

/***/ "../../../http/src/base_request_options.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enums__ = __webpack_require__("../../../http/src/enums.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__headers__ = __webpack_require__("../../../http/src/headers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__http_utils__ = __webpack_require__("../../../http/src/http_utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__url_search_params__ = __webpack_require__("../../../http/src/url_search_params.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RequestOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseRequestOptions; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





/**
 * Creates a request options object to be optionally provided when instantiating a
 * {\@link Request}.
 *
 * This class is based on the `RequestInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#requestinit).
 *
 * All values are null by default. Typical defaults can be found in the {\@link BaseRequestOptions}
 * class, which sub-classes `RequestOptions`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7Wvi3lfLq41aQPKlxB4O?p=preview))
 *
 * ```typescript
 * import {RequestOptions, Request, RequestMethod} from '\@angular/http';
 *
 * var options = new RequestOptions({
 *   method: RequestMethod.Post,
 *   url: 'https://google.com'
 * });
 * var req = new Request(options);
 * console.log('req.method:', RequestMethod[req.method]); // Post
 * console.log('options.url:', options.url); // https://google.com
 * ```
 *
 * \@experimental
 */
var RequestOptions = (function () {
    /**
     * @param {?=} __0
     */
    function RequestOptions(_a) {
        var _b = _a === void 0 ? {} : _a, method = _b.method, headers = _b.headers, body = _b.body, url = _b.url, search = _b.search, withCredentials = _b.withCredentials, responseType = _b.responseType;
        this.method = method != null ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__http_utils__["b" /* normalizeMethodName */])(method) : null;
        this.headers = headers != null ? headers : null;
        this.body = body != null ? body : null;
        this.url = url != null ? url : null;
        this.search =
            search != null ? (typeof search === 'string' ? new __WEBPACK_IMPORTED_MODULE_4__url_search_params__["b" /* URLSearchParams */](search) : search) : null;
        this.withCredentials = withCredentials != null ? withCredentials : null;
        this.responseType = responseType != null ? responseType : null;
    }
    /**
     * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * Note that `headers` and `search` will override existing values completely if present in
     * the `options` object. If these values should be merged, it should be done prior to calling
     * `merge` on the `RequestOptions` instance.
     *
     * ### Example ([live demo](http://plnkr.co/edit/6w8XA8YTkDRcPYpdB9dk?p=preview))
     *
     * ```typescript
     * import {RequestOptions, Request, RequestMethod} from '\@angular/http';
     *
     * var options = new RequestOptions({
     *   method: RequestMethod.Post
     * });
     * var req = new Request(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('req.method:', RequestMethod[req.method]); // Post
     * console.log('options.url:', options.url); // null
     * console.log('req.url:', req.url); // https://google.com
     * ```
     * @param {?=} options
     * @return {?}
     */
    RequestOptions.prototype.merge = function (options) {
        return new RequestOptions({
            method: options && options.method != null ? options.method : this.method,
            headers: options && options.headers != null ? options.headers : new __WEBPACK_IMPORTED_MODULE_2__headers__["a" /* Headers */](this.headers),
            body: options && options.body != null ? options.body : this.body,
            url: options && options.url != null ? options.url : this.url,
            search: options && options.search != null ?
                (typeof options.search === 'string' ? new __WEBPACK_IMPORTED_MODULE_4__url_search_params__["b" /* URLSearchParams */](options.search) :
                    options.search.clone()) :
                this.search,
            withCredentials: options && options.withCredentials != null ? options.withCredentials :
                this.withCredentials,
            responseType: options && options.responseType != null ? options.responseType :
                this.responseType
        });
    };
    return RequestOptions;
}());
function RequestOptions_tsickle_Closure_declarations() {
    /**
     * Http method with which to execute a {\@link Request}.
     * Acceptable methods are defined in the {\@link RequestMethod} enum.
     * @type {?}
     */
    RequestOptions.prototype.method;
    /**
     * {\@link Headers} to be attached to a {\@link Request}.
     * @type {?}
     */
    RequestOptions.prototype.headers;
    /**
     * Body to be used when creating a {\@link Request}.
     * @type {?}
     */
    RequestOptions.prototype.body;
    /**
     * Url with which to perform a {\@link Request}.
     * @type {?}
     */
    RequestOptions.prototype.url;
    /**
     * Search parameters to be included in a {\@link Request}.
     * @type {?}
     */
    RequestOptions.prototype.search;
    /**
     * Enable use credentials for a {\@link Request}.
     * @type {?}
     */
    RequestOptions.prototype.withCredentials;
    /** @type {?} */
    RequestOptions.prototype.responseType;
}
/**
 * Subclass of {\@link RequestOptions}, with default values.
 *
 * Default values:
 *  * method: {\@link RequestMethod RequestMethod.Get}
 *  * headers: empty {\@link Headers} object
 *
 * This class could be extended and bound to the {\@link RequestOptions} class
 * when configuring an {\@link Injector}, in order to override the default options
 * used by {\@link Http} to create and send {\@link Request Requests}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/LEKVSx?p=preview))
 *
 * ```typescript
 * import {provide} from '\@angular/core';
 * import {bootstrap} from '\@angular/platform-browser/browser';
 * import {HTTP_PROVIDERS, Http, BaseRequestOptions, RequestOptions} from '\@angular/http';
 * import {App} from './myapp';
 *
 * class MyOptions extends BaseRequestOptions {
 *   search: string = 'coreTeam=true';
 * }
 *
 * bootstrap(App, [HTTP_PROVIDERS, {provide: RequestOptions, useClass: MyOptions}]);
 * ```
 *
 * The options could also be extended when manually creating a {\@link Request}
 * object.
 *
 * ### Example ([live demo](http://plnkr.co/edit/oyBoEvNtDhOSfi9YxaVb?p=preview))
 *
 * ```
 * import {BaseRequestOptions, Request, RequestMethod} from '\@angular/http';
 *
 * var options = new BaseRequestOptions();
 * var req = new Request(options.merge({
 *   method: RequestMethod.Post,
 *   url: 'https://google.com'
 * }));
 * console.log('req.method:', RequestMethod[req.method]); // Post
 * console.log('options.url:', options.url); // null
 * console.log('req.url:', req.url); // https://google.com
 * ```
 *
 * \@experimental
 */
var BaseRequestOptions = (function (_super) {
    __extends(BaseRequestOptions, _super);
    function BaseRequestOptions() {
        _super.call(this, { method: __WEBPACK_IMPORTED_MODULE_1__enums__["b" /* RequestMethod */].Get, headers: new __WEBPACK_IMPORTED_MODULE_2__headers__["a" /* Headers */]() });
    }
    BaseRequestOptions.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    BaseRequestOptions.ctorParameters = function () { return []; };
    return BaseRequestOptions;
}(RequestOptions));
function BaseRequestOptions_tsickle_Closure_declarations() {
    /** @type {?} */
    BaseRequestOptions.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    BaseRequestOptions.ctorParameters;
}
//# sourceMappingURL=base_request_options.js.map

/***/ }),

/***/ "../../../http/src/base_response_options.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enums__ = __webpack_require__("../../../http/src/enums.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__headers__ = __webpack_require__("../../../http/src/headers.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ResponseOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseResponseOptions; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * Creates a response options object to be optionally provided when instantiating a
 * {\@link Response}.
 *
 * This class is based on the `ResponseInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#responseinit).
 *
 * All values are null by default. Typical defaults can be found in the
 * {\@link BaseResponseOptions} class, which sub-classes `ResponseOptions`.
 *
 * This class may be used in tests to build {\@link Response Responses} for
 * mock responses (see {\@link MockBackend}).
 *
 * ### Example ([live demo](http://plnkr.co/edit/P9Jkk8e8cz6NVzbcxEsD?p=preview))
 *
 * ```typescript
 * import {ResponseOptions, Response} from '\@angular/http';
 *
 * var options = new ResponseOptions({
 *   body: '{"name":"Jeff"}'
 * });
 * var res = new Response(options);
 *
 * console.log('res.json():', res.json()); // Object {name: "Jeff"}
 * ```
 *
 * \@experimental
 */
var ResponseOptions = (function () {
    /**
     * @param {?=} __0
     */
    function ResponseOptions(_a) {
        var _b = _a === void 0 ? {} : _a, body = _b.body, status = _b.status, headers = _b.headers, statusText = _b.statusText, type = _b.type, url = _b.url;
        this.body = body != null ? body : null;
        this.status = status != null ? status : null;
        this.headers = headers != null ? headers : null;
        this.statusText = statusText != null ? statusText : null;
        this.type = type != null ? type : null;
        this.url = url != null ? url : null;
    }
    /**
     * Creates a copy of the `ResponseOptions` instance, using the optional input as values to
     * override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * This may be useful when sharing a base `ResponseOptions` object inside tests,
     * where certain properties may change from test to test.
     *
     * ### Example ([live demo](http://plnkr.co/edit/1lXquqFfgduTFBWjNoRE?p=preview))
     *
     * ```typescript
     * import {ResponseOptions, Response} from '\@angular/http';
     *
     * var options = new ResponseOptions({
     *   body: {name: 'Jeff'}
     * });
     * var res = new Response(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('options.url:', options.url); // null
     * console.log('res.json():', res.json()); // Object {name: "Jeff"}
     * console.log('res.url:', res.url); // https://google.com
     * ```
     * @param {?=} options
     * @return {?}
     */
    ResponseOptions.prototype.merge = function (options) {
        return new ResponseOptions({
            body: options && options.body != null ? options.body : this.body,
            status: options && options.status != null ? options.status : this.status,
            headers: options && options.headers != null ? options.headers : this.headers,
            statusText: options && options.statusText != null ? options.statusText : this.statusText,
            type: options && options.type != null ? options.type : this.type,
            url: options && options.url != null ? options.url : this.url,
        });
    };
    return ResponseOptions;
}());
function ResponseOptions_tsickle_Closure_declarations() {
    /**
     * String, Object, ArrayBuffer or Blob representing the body of the {\@link Response}.
     * @type {?}
     */
    ResponseOptions.prototype.body;
    /**
     * Http {\@link http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html status code}
     * associated with the response.
     * @type {?}
     */
    ResponseOptions.prototype.status;
    /**
     * Response {\@link Headers headers}
     * @type {?}
     */
    ResponseOptions.prototype.headers;
    /**
     * \@internal
     * @type {?}
     */
    ResponseOptions.prototype.statusText;
    /**
     * \@internal
     * @type {?}
     */
    ResponseOptions.prototype.type;
    /** @type {?} */
    ResponseOptions.prototype.url;
}
/**
 * Subclass of {\@link ResponseOptions}, with default values.
 *
 * Default values:
 *  * status: 200
 *  * headers: empty {\@link Headers} object
 *
 * This class could be extended and bound to the {\@link ResponseOptions} class
 * when configuring an {\@link Injector}, in order to override the default options
 * used by {\@link Http} to create {\@link Response Responses}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/qv8DLT?p=preview))
 *
 * ```typescript
 * import {provide} from '\@angular/core';
 * import {bootstrap} from '\@angular/platform-browser/browser';
 * import {HTTP_PROVIDERS, Headers, Http, BaseResponseOptions, ResponseOptions} from
 * '\@angular/http';
 * import {App} from './myapp';
 *
 * class MyOptions extends BaseResponseOptions {
 *   headers:Headers = new Headers({network: 'github'});
 * }
 *
 * bootstrap(App, [HTTP_PROVIDERS, {provide: ResponseOptions, useClass: MyOptions}]);
 * ```
 *
 * The options could also be extended when manually creating a {\@link Response}
 * object.
 *
 * ### Example ([live demo](http://plnkr.co/edit/VngosOWiaExEtbstDoix?p=preview))
 *
 * ```
 * import {BaseResponseOptions, Response} from '\@angular/http';
 *
 * var options = new BaseResponseOptions();
 * var res = new Response(options.merge({
 *   body: 'Angular',
 *   headers: new Headers({framework: 'angular'})
 * }));
 * console.log('res.headers.get("framework"):', res.headers.get('framework')); // angular
 * console.log('res.text():', res.text()); // Angular;
 * ```
 *
 * \@experimental
 */
var BaseResponseOptions = (function (_super) {
    __extends(BaseResponseOptions, _super);
    function BaseResponseOptions() {
        _super.call(this, { status: 200, statusText: 'Ok', type: __WEBPACK_IMPORTED_MODULE_1__enums__["d" /* ResponseType */].Default, headers: new __WEBPACK_IMPORTED_MODULE_2__headers__["a" /* Headers */]() });
    }
    BaseResponseOptions.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    BaseResponseOptions.ctorParameters = function () { return []; };
    return BaseResponseOptions;
}(ResponseOptions));
function BaseResponseOptions_tsickle_Closure_declarations() {
    /** @type {?} */
    BaseResponseOptions.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    BaseResponseOptions.ctorParameters;
}
//# sourceMappingURL=base_response_options.js.map

/***/ }),

/***/ "../../../http/src/body.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__http_utils__ = __webpack_require__("../../../http/src/http_utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__url_search_params__ = __webpack_require__("../../../http/src/url_search_params.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Body; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * HTTP request body used by both {\@link Request} and {\@link Response}
 * https://fetch.spec.whatwg.org/#body
 * @abstract
 */
var Body = (function () {
    function Body() {
    }
    /**
     * Attempts to return body as parsed `JSON` object, or raises an exception.
     * @return {?}
     */
    Body.prototype.json = function () {
        if (typeof this._body === 'string') {
            return JSON.parse(/** @type {?} */ (this._body));
        }
        if (this._body instanceof ArrayBuffer) {
            return JSON.parse(this.text());
        }
        return this._body;
    };
    /**
     * Returns the body as a string, presuming `toString()` can be called on the response body.
     * @return {?}
     */
    Body.prototype.text = function () {
        if (this._body instanceof __WEBPACK_IMPORTED_MODULE_1__url_search_params__["b" /* URLSearchParams */]) {
            return this._body.toString();
        }
        if (this._body instanceof ArrayBuffer) {
            return String.fromCharCode.apply(null, new Uint16Array(/** @type {?} */ (this._body)));
        }
        if (this._body == null) {
            return '';
        }
        if (typeof this._body === 'object') {
            return JSON.stringify(this._body, null, 2);
        }
        return this._body.toString();
    };
    /**
     * Return the body as an ArrayBuffer
     * @return {?}
     */
    Body.prototype.arrayBuffer = function () {
        if (this._body instanceof ArrayBuffer) {
            return (this._body);
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__http_utils__["a" /* stringToArrayBuffer */])(this.text());
    };
    /**
     * Returns the request's body as a Blob, assuming that body exists.
     * @return {?}
     */
    Body.prototype.blob = function () {
        if (this._body instanceof Blob) {
            return (this._body);
        }
        if (this._body instanceof ArrayBuffer) {
            return new Blob([this._body]);
        }
        throw new Error('The request body isn\'t either a blob or an array buffer');
    };
    return Body;
}());
function Body_tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    Body.prototype._body;
}
//# sourceMappingURL=body.js.map

/***/ }),

/***/ "../../../http/src/enums.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RequestMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReadyState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ResponseType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ContentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ResponseContentType; });
var RequestMethod = {};
RequestMethod.Get = 0;
RequestMethod.Post = 1;
RequestMethod.Put = 2;
RequestMethod.Delete = 3;
RequestMethod.Options = 4;
RequestMethod.Head = 5;
RequestMethod.Patch = 6;
RequestMethod[RequestMethod.Get] = "Get";
RequestMethod[RequestMethod.Post] = "Post";
RequestMethod[RequestMethod.Put] = "Put";
RequestMethod[RequestMethod.Delete] = "Delete";
RequestMethod[RequestMethod.Options] = "Options";
RequestMethod[RequestMethod.Head] = "Head";
RequestMethod[RequestMethod.Patch] = "Patch";
var ReadyState = {};
ReadyState.Unsent = 0;
ReadyState.Open = 1;
ReadyState.HeadersReceived = 2;
ReadyState.Loading = 3;
ReadyState.Done = 4;
ReadyState.Cancelled = 5;
ReadyState[ReadyState.Unsent] = "Unsent";
ReadyState[ReadyState.Open] = "Open";
ReadyState[ReadyState.HeadersReceived] = "HeadersReceived";
ReadyState[ReadyState.Loading] = "Loading";
ReadyState[ReadyState.Done] = "Done";
ReadyState[ReadyState.Cancelled] = "Cancelled";
var ResponseType = {};
ResponseType.Basic = 0;
ResponseType.Cors = 1;
ResponseType.Default = 2;
ResponseType.Error = 3;
ResponseType.Opaque = 4;
ResponseType[ResponseType.Basic] = "Basic";
ResponseType[ResponseType.Cors] = "Cors";
ResponseType[ResponseType.Default] = "Default";
ResponseType[ResponseType.Error] = "Error";
ResponseType[ResponseType.Opaque] = "Opaque";
var ContentType = {};
ContentType.NONE = 0;
ContentType.JSON = 1;
ContentType.FORM = 2;
ContentType.FORM_DATA = 3;
ContentType.TEXT = 4;
ContentType.BLOB = 5;
ContentType.ARRAY_BUFFER = 6;
ContentType[ContentType.NONE] = "NONE";
ContentType[ContentType.JSON] = "JSON";
ContentType[ContentType.FORM] = "FORM";
ContentType[ContentType.FORM_DATA] = "FORM_DATA";
ContentType[ContentType.TEXT] = "TEXT";
ContentType[ContentType.BLOB] = "BLOB";
ContentType[ContentType.ARRAY_BUFFER] = "ARRAY_BUFFER";
var ResponseContentType = {};
ResponseContentType.Text = 0;
ResponseContentType.Json = 1;
ResponseContentType.ArrayBuffer = 2;
ResponseContentType.Blob = 3;
ResponseContentType[ResponseContentType.Text] = "Text";
ResponseContentType[ResponseContentType.Json] = "Json";
ResponseContentType[ResponseContentType.ArrayBuffer] = "ArrayBuffer";
ResponseContentType[ResponseContentType.Blob] = "Blob";
//# sourceMappingURL=enums.js.map

/***/ }),

/***/ "../../../http/src/headers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Headers; });
/**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
 *
 * The only known difference between this `Headers` implementation and the spec is the
 * lack of an `entries` method.
 *
 * ### Example
 *
 * ```
 * import {Headers} from '\@angular/http';
 *
 * var firstHeaders = new Headers();
 * firstHeaders.append('Content-Type', 'image/jpeg');
 * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
 *
 * // Create headers from Plain Old JavaScript Object
 * var secondHeaders = new Headers({
 *   'X-My-Custom-Header': 'Angular'
 * });
 * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
 *
 * var thirdHeaders = new Headers(secondHeaders);
 * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
 * ```
 *
 * \@experimental
 */
var Headers = (function () {
    /**
     * @param {?=} headers
     */
    function Headers(headers) {
        var _this = this;
        /** @internal header names are lower case */
        this._headers = new Map();
        /** @internal map lower case names to actual names */
        this._normalizedNames = new Map();
        if (!headers) {
            return;
        }
        if (headers instanceof Headers) {
            headers.forEach(function (values, name) {
                values.forEach(function (value) { return _this.append(name, value); });
            });
            return;
        }
        Object.keys(headers).forEach(function (name) {
            var values = Array.isArray(headers[name]) ? headers[name] : [headers[name]];
            _this.delete(name);
            values.forEach(function (value) { return _this.append(name, value); });
        });
    }
    /**
     * Returns a new Headers instance from the given DOMString of Response Headers
     * @param {?} headersString
     * @return {?}
     */
    Headers.fromResponseHeaderString = function (headersString) {
        var /** @type {?} */ headers = new Headers();
        headersString.split('\n').forEach(function (line) {
            var /** @type {?} */ index = line.indexOf(':');
            if (index > 0) {
                var /** @type {?} */ name_1 = line.slice(0, index);
                var /** @type {?} */ value = line.slice(index + 1).trim();
                headers.set(name_1, value);
            }
        });
        return headers;
    };
    /**
     * Appends a header to existing list of header values for a given header name.
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    Headers.prototype.append = function (name, value) {
        var /** @type {?} */ values = this.getAll(name);
        if (values === null) {
            this.set(name, value);
        }
        else {
            values.push(value);
        }
    };
    /**
     * Deletes all header values for the given name.
     * @param {?} name
     * @return {?}
     */
    Headers.prototype.delete = function (name) {
        var /** @type {?} */ lcName = name.toLowerCase();
        this._normalizedNames.delete(lcName);
        this._headers.delete(lcName);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Headers.prototype.forEach = function (fn) {
        var _this = this;
        this._headers.forEach(function (values, lcName) { return fn(values, _this._normalizedNames.get(lcName), _this._headers); });
    };
    /**
     * Returns first header that matches given name.
     * @param {?} name
     * @return {?}
     */
    Headers.prototype.get = function (name) {
        var /** @type {?} */ values = this.getAll(name);
        if (values === null) {
            return null;
        }
        return values.length > 0 ? values[0] : null;
    };
    /**
     * Checks for existence of header by given name.
     * @param {?} name
     * @return {?}
     */
    Headers.prototype.has = function (name) { return this._headers.has(name.toLowerCase()); };
    /**
     * Returns the names of the headers
     * @return {?}
     */
    Headers.prototype.keys = function () { return Array.from(this._normalizedNames.values()); };
    /**
     * Sets or overrides header value for given name.
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    Headers.prototype.set = function (name, value) {
        if (Array.isArray(value)) {
            if (value.length) {
                this._headers.set(name.toLowerCase(), [value.join(',')]);
            }
        }
        else {
            this._headers.set(name.toLowerCase(), [value]);
        }
        this.mayBeSetNormalizedName(name);
    };
    /**
     * Returns values of all headers.
     * @return {?}
     */
    Headers.prototype.values = function () { return Array.from(this._headers.values()); };
    /**
     * @return {?}
     */
    Headers.prototype.toJSON = function () {
        var _this = this;
        var /** @type {?} */ serialized = {};
        this._headers.forEach(function (values, name) {
            var /** @type {?} */ split = [];
            values.forEach(function (v) { return split.push.apply(split, v.split(',')); });
            serialized[_this._normalizedNames.get(name)] = split;
        });
        return serialized;
    };
    /**
     * Returns list of header values for a given name.
     * @param {?} name
     * @return {?}
     */
    Headers.prototype.getAll = function (name) {
        return this.has(name) ? this._headers.get(name.toLowerCase()) : null;
    };
    /**
     * This method is not implemented.
     * @return {?}
     */
    Headers.prototype.entries = function () { throw new Error('"entries" method is not implemented on Headers class'); };
    /**
     * @param {?} name
     * @return {?}
     */
    Headers.prototype.mayBeSetNormalizedName = function (name) {
        var /** @type {?} */ lcName = name.toLowerCase();
        if (!this._normalizedNames.has(lcName)) {
            this._normalizedNames.set(lcName, name);
        }
    };
    return Headers;
}());
function Headers_tsickle_Closure_declarations() {
    /**
     * \@internal header names are lower case
     * @type {?}
     */
    Headers.prototype._headers;
    /**
     * \@internal map lower case names to actual names
     * @type {?}
     */
    Headers.prototype._normalizedNames;
}
//# sourceMappingURL=headers.js.map

/***/ }),

/***/ "../../../http/src/http.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_request_options__ = __webpack_require__("../../../http/src/base_request_options.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enums__ = __webpack_require__("../../../http/src/enums.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interfaces__ = __webpack_require__("../../../http/src/interfaces.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__static_request__ = __webpack_require__("../../../http/src/static_request.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Http; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Jsonp; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





/**
 * @param {?} backend
 * @param {?} request
 * @return {?}
 */
function httpRequest(backend, request) {
    return backend.createConnection(request).response;
}
/**
 * @param {?} defaultOpts
 * @param {?} providedOpts
 * @param {?} method
 * @param {?} url
 * @return {?}
 */
function mergeOptions(defaultOpts, providedOpts, method, url) {
    var /** @type {?} */ newOptions = defaultOpts;
    if (providedOpts) {
        // Hack so Dart can used named parameters
        return newOptions.merge(new __WEBPACK_IMPORTED_MODULE_1__base_request_options__["b" /* RequestOptions */]({
            method: providedOpts.method || method,
            url: providedOpts.url || url,
            search: providedOpts.search,
            headers: providedOpts.headers,
            body: providedOpts.body,
            withCredentials: providedOpts.withCredentials,
            responseType: providedOpts.responseType
        }));
    }
    return newOptions.merge(new __WEBPACK_IMPORTED_MODULE_1__base_request_options__["b" /* RequestOptions */]({ method: method, url: url }));
}
/**
 * Performs http requests using `XMLHttpRequest` as the default backend.
 *
 * `Http` is available as an injectable class, with methods to perform http requests. Calling
 * `request` returns an `Observable` which will emit a single {\@link Response} when a
 * response is received.
 *
 * ### Example
 *
 * ```typescript
 * import {Http, HTTP_PROVIDERS} from '\@angular/http';
 * import 'rxjs/add/operator/map'
 * \@Component({
 *   selector: 'http-app',
 *   viewProviders: [HTTP_PROVIDERS],
 *   templateUrl: 'people.html'
 * })
 * class PeopleComponent {
 *   constructor(http: Http) {
 *     http.get('people.json')
 *       // Call map on the response observable to get the parsed people object
 *       .map(res => res.json())
 *       // Subscribe to the observable to get the parsed people object and attach it to the
 *       // component
 *       .subscribe(people => this.people = people);
 *   }
 * }
 * ```
 *
 *
 * ### Example
 *
 * ```
 * http.get('people.json').subscribe((res:Response) => this.people = res.json());
 * ```
 *
 * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
 * {\@link XHRBackend} in this case), which could be mocked with dependency injection by replacing
 * the {\@link XHRBackend} provider, as in the following example:
 *
 * ### Example
 *
 * ```typescript
 * import {BaseRequestOptions, Http} from '\@angular/http';
 * import {MockBackend} from '\@angular/http/testing';
 * var injector = Injector.resolveAndCreate([
 *   BaseRequestOptions,
 *   MockBackend,
 *   {provide: Http, useFactory:
 *       function(backend, defaultOptions) {
 *         return new Http(backend, defaultOptions);
 *       },
 *       deps: [MockBackend, BaseRequestOptions]}
 * ]);
 * var http = injector.get(Http);
 * http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
 * ```
 *
 * \@experimental
 */
var Http = (function () {
    /**
     * @param {?} _backend
     * @param {?} _defaultOptions
     */
    function Http(_backend, _defaultOptions) {
        this._backend = _backend;
        this._defaultOptions = _defaultOptions;
    }
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {\@link Request} instance. If the first argument is a url, an optional {\@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {\@link BaseRequestOptions} before performing the request.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.request = function (url, options) {
        var /** @type {?} */ responseObservable;
        if (typeof url === 'string') {
            responseObservable = httpRequest(this._backend, new __WEBPACK_IMPORTED_MODULE_4__static_request__["a" /* Request */](mergeOptions(this._defaultOptions, options, __WEBPACK_IMPORTED_MODULE_2__enums__["b" /* RequestMethod */].Get, /** @type {?} */ (url))));
        }
        else if (url instanceof __WEBPACK_IMPORTED_MODULE_4__static_request__["a" /* Request */]) {
            responseObservable = httpRequest(this._backend, url);
        }
        else {
            throw new Error('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    };
    /**
     * Performs a request with `get` http method.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.get = function (url, options) {
        return this.request(new __WEBPACK_IMPORTED_MODULE_4__static_request__["a" /* Request */](mergeOptions(this._defaultOptions, options, __WEBPACK_IMPORTED_MODULE_2__enums__["b" /* RequestMethod */].Get, url)));
    };
    /**
     * Performs a request with `post` http method.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.post = function (url, body, options) {
        return this.request(new __WEBPACK_IMPORTED_MODULE_4__static_request__["a" /* Request */](mergeOptions(this._defaultOptions.merge(new __WEBPACK_IMPORTED_MODULE_1__base_request_options__["b" /* RequestOptions */]({ body: body })), options, __WEBPACK_IMPORTED_MODULE_2__enums__["b" /* RequestMethod */].Post, url)));
    };
    /**
     * Performs a request with `put` http method.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.put = function (url, body, options) {
        return this.request(new __WEBPACK_IMPORTED_MODULE_4__static_request__["a" /* Request */](mergeOptions(this._defaultOptions.merge(new __WEBPACK_IMPORTED_MODULE_1__base_request_options__["b" /* RequestOptions */]({ body: body })), options, __WEBPACK_IMPORTED_MODULE_2__enums__["b" /* RequestMethod */].Put, url)));
    };
    /**
     * Performs a request with `delete` http method.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.delete = function (url, options) {
        return this.request(new __WEBPACK_IMPORTED_MODULE_4__static_request__["a" /* Request */](mergeOptions(this._defaultOptions, options, __WEBPACK_IMPORTED_MODULE_2__enums__["b" /* RequestMethod */].Delete, url)));
    };
    /**
     * Performs a request with `patch` http method.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.patch = function (url, body, options) {
        return this.request(new __WEBPACK_IMPORTED_MODULE_4__static_request__["a" /* Request */](mergeOptions(this._defaultOptions.merge(new __WEBPACK_IMPORTED_MODULE_1__base_request_options__["b" /* RequestOptions */]({ body: body })), options, __WEBPACK_IMPORTED_MODULE_2__enums__["b" /* RequestMethod */].Patch, url)));
    };
    /**
     * Performs a request with `head` http method.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.head = function (url, options) {
        return this.request(new __WEBPACK_IMPORTED_MODULE_4__static_request__["a" /* Request */](mergeOptions(this._defaultOptions, options, __WEBPACK_IMPORTED_MODULE_2__enums__["b" /* RequestMethod */].Head, url)));
    };
    /**
     * Performs a request with `options` http method.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    Http.prototype.options = function (url, options) {
        return this.request(new __WEBPACK_IMPORTED_MODULE_4__static_request__["a" /* Request */](mergeOptions(this._defaultOptions, options, __WEBPACK_IMPORTED_MODULE_2__enums__["b" /* RequestMethod */].Options, url)));
    };
    Http.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    Http.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_3__interfaces__["b" /* ConnectionBackend */], },
        { type: __WEBPACK_IMPORTED_MODULE_1__base_request_options__["b" /* RequestOptions */], },
    ]; };
    return Http;
}());
function Http_tsickle_Closure_declarations() {
    /** @type {?} */
    Http.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Http.ctorParameters;
    /** @type {?} */
    Http.prototype._backend;
    /** @type {?} */
    Http.prototype._defaultOptions;
}
/**
 * \@experimental
 */
var Jsonp = (function (_super) {
    __extends(Jsonp, _super);
    /**
     * @param {?} backend
     * @param {?} defaultOptions
     */
    function Jsonp(backend, defaultOptions) {
        _super.call(this, backend, defaultOptions);
    }
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {\@link Request} instance. If the first argument is a url, an optional {\@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {\@link BaseRequestOptions} before performing the request.
     *
     * \@security Regular XHR is the safest alternative to JSONP for most applications, and is
     * supported by all current browsers. Because JSONP creates a `<script>` element with
     * contents retrieved from a remote source, attacker-controlled data introduced by an untrusted
     * source could expose your application to XSS risks. Data exposed by JSONP may also be
     * readable by malicious third-party websites. In addition, JSONP introduces potential risk for
     * future security issues (e.g. content sniffing).  For more detail, see the
     * [Security Guide](http://g.co/ng/security).
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    Jsonp.prototype.request = function (url, options) {
        var /** @type {?} */ responseObservable;
        if (typeof url === 'string') {
            url =
                new __WEBPACK_IMPORTED_MODULE_4__static_request__["a" /* Request */](mergeOptions(this._defaultOptions, options, __WEBPACK_IMPORTED_MODULE_2__enums__["b" /* RequestMethod */].Get, /** @type {?} */ (url)));
        }
        if (url instanceof __WEBPACK_IMPORTED_MODULE_4__static_request__["a" /* Request */]) {
            if (url.method !== __WEBPACK_IMPORTED_MODULE_2__enums__["b" /* RequestMethod */].Get) {
                throw new Error('JSONP requests must use GET request method.');
            }
            responseObservable = httpRequest(this._backend, url);
        }
        else {
            throw new Error('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    };
    Jsonp.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    Jsonp.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_3__interfaces__["b" /* ConnectionBackend */], },
        { type: __WEBPACK_IMPORTED_MODULE_1__base_request_options__["b" /* RequestOptions */], },
    ]; };
    return Jsonp;
}(Http));
function Jsonp_tsickle_Closure_declarations() {
    /** @type {?} */
    Jsonp.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Jsonp.ctorParameters;
}
//# sourceMappingURL=http.js.map

/***/ }),

/***/ "../../../http/src/http_module.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__backends_browser_jsonp__ = __webpack_require__("../../../http/src/backends/browser_jsonp.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__backends_browser_xhr__ = __webpack_require__("../../../http/src/backends/browser_xhr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__backends_jsonp_backend__ = __webpack_require__("../../../http/src/backends/jsonp_backend.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__backends_xhr_backend__ = __webpack_require__("../../../http/src/backends/xhr_backend.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_request_options__ = __webpack_require__("../../../http/src/base_request_options.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__base_response_options__ = __webpack_require__("../../../http/src/base_response_options.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__http__ = __webpack_require__("../../../http/src/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__interfaces__ = __webpack_require__("../../../http/src/interfaces.js");
/* unused harmony export _createDefaultCookieXSRFStrategy */
/* unused harmony export httpFactory */
/* unused harmony export jsonpFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return JsonpModule; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */









/**
 * @return {?}
 */
function _createDefaultCookieXSRFStrategy() {
    return new __WEBPACK_IMPORTED_MODULE_4__backends_xhr_backend__["a" /* CookieXSRFStrategy */]();
}
/**
 * @param {?} xhrBackend
 * @param {?} requestOptions
 * @return {?}
 */
function httpFactory(xhrBackend, requestOptions) {
    return new __WEBPACK_IMPORTED_MODULE_7__http__["a" /* Http */](xhrBackend, requestOptions);
}
/**
 * @param {?} jsonpBackend
 * @param {?} requestOptions
 * @return {?}
 */
function jsonpFactory(jsonpBackend, requestOptions) {
    return new __WEBPACK_IMPORTED_MODULE_7__http__["b" /* Jsonp */](jsonpBackend, requestOptions);
}
/**
 * The module that includes http's providers
 *
 * \@experimental
 */
var HttpModule = (function () {
    function HttpModule() {
    }
    HttpModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    providers: [
                        // TODO(pascal): use factory type annotations once supported in DI
                        // issue: https://github.com/angular/angular/issues/3183
                        { provide: __WEBPACK_IMPORTED_MODULE_7__http__["a" /* Http */], useFactory: httpFactory, deps: [__WEBPACK_IMPORTED_MODULE_4__backends_xhr_backend__["b" /* XHRBackend */], __WEBPACK_IMPORTED_MODULE_5__base_request_options__["b" /* RequestOptions */]] },
                        __WEBPACK_IMPORTED_MODULE_2__backends_browser_xhr__["a" /* BrowserXhr */],
                        { provide: __WEBPACK_IMPORTED_MODULE_5__base_request_options__["b" /* RequestOptions */], useClass: __WEBPACK_IMPORTED_MODULE_5__base_request_options__["a" /* BaseRequestOptions */] },
                        { provide: __WEBPACK_IMPORTED_MODULE_6__base_response_options__["b" /* ResponseOptions */], useClass: __WEBPACK_IMPORTED_MODULE_6__base_response_options__["a" /* BaseResponseOptions */] },
                        __WEBPACK_IMPORTED_MODULE_4__backends_xhr_backend__["b" /* XHRBackend */],
                        { provide: __WEBPACK_IMPORTED_MODULE_8__interfaces__["c" /* XSRFStrategy */], useFactory: _createDefaultCookieXSRFStrategy },
                    ],
                },] },
    ];
    /** @nocollapse */
    HttpModule.ctorParameters = function () { return []; };
    return HttpModule;
}());
function HttpModule_tsickle_Closure_declarations() {
    /** @type {?} */
    HttpModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    HttpModule.ctorParameters;
}
/**
 * The module that includes jsonp's providers
 *
 * \@experimental
 */
var JsonpModule = (function () {
    function JsonpModule() {
    }
    JsonpModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    providers: [
                        // TODO(pascal): use factory type annotations once supported in DI
                        // issue: https://github.com/angular/angular/issues/3183
                        { provide: __WEBPACK_IMPORTED_MODULE_7__http__["b" /* Jsonp */], useFactory: jsonpFactory, deps: [__WEBPACK_IMPORTED_MODULE_3__backends_jsonp_backend__["a" /* JSONPBackend */], __WEBPACK_IMPORTED_MODULE_5__base_request_options__["b" /* RequestOptions */]] },
                        __WEBPACK_IMPORTED_MODULE_1__backends_browser_jsonp__["a" /* BrowserJsonp */],
                        { provide: __WEBPACK_IMPORTED_MODULE_5__base_request_options__["b" /* RequestOptions */], useClass: __WEBPACK_IMPORTED_MODULE_5__base_request_options__["a" /* BaseRequestOptions */] },
                        { provide: __WEBPACK_IMPORTED_MODULE_6__base_response_options__["b" /* ResponseOptions */], useClass: __WEBPACK_IMPORTED_MODULE_6__base_response_options__["a" /* BaseResponseOptions */] },
                        { provide: __WEBPACK_IMPORTED_MODULE_3__backends_jsonp_backend__["a" /* JSONPBackend */], useClass: __WEBPACK_IMPORTED_MODULE_3__backends_jsonp_backend__["c" /* JSONPBackend_ */] },
                    ],
                },] },
    ];
    /** @nocollapse */
    JsonpModule.ctorParameters = function () { return []; };
    return JsonpModule;
}());
function JsonpModule_tsickle_Closure_declarations() {
    /** @type {?} */
    JsonpModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JsonpModule.ctorParameters;
}
//# sourceMappingURL=http_module.js.map

/***/ }),

/***/ "../../../http/src/http_utils.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enums__ = __webpack_require__("../../../http/src/enums.js");
/* harmony export (immutable) */ __webpack_exports__["b"] = normalizeMethodName;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isSuccess; });
/* harmony export (immutable) */ __webpack_exports__["c"] = getResponseURL;
/* harmony export (immutable) */ __webpack_exports__["a"] = stringToArrayBuffer;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @param {?} method
 * @return {?}
 */
function normalizeMethodName(method) {
    if (typeof method !== 'string')
        return method;
    switch (method.toUpperCase()) {
        case 'GET':
            return __WEBPACK_IMPORTED_MODULE_0__enums__["b" /* RequestMethod */].Get;
        case 'POST':
            return __WEBPACK_IMPORTED_MODULE_0__enums__["b" /* RequestMethod */].Post;
        case 'PUT':
            return __WEBPACK_IMPORTED_MODULE_0__enums__["b" /* RequestMethod */].Put;
        case 'DELETE':
            return __WEBPACK_IMPORTED_MODULE_0__enums__["b" /* RequestMethod */].Delete;
        case 'OPTIONS':
            return __WEBPACK_IMPORTED_MODULE_0__enums__["b" /* RequestMethod */].Options;
        case 'HEAD':
            return __WEBPACK_IMPORTED_MODULE_0__enums__["b" /* RequestMethod */].Head;
        case 'PATCH':
            return __WEBPACK_IMPORTED_MODULE_0__enums__["b" /* RequestMethod */].Patch;
    }
    throw new Error("Invalid request method. The method \"" + method + "\" is not supported.");
}
var /** @type {?} */ isSuccess = function (status) { return (status >= 200 && status < 300); };
/**
 * @param {?} xhr
 * @return {?}
 */
function getResponseURL(xhr) {
    if ('responseURL' in xhr) {
        return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
    return;
}
/**
 * @param {?} input
 * @return {?}
 */
function stringToArrayBuffer(input) {
    var /** @type {?} */ view = new Uint16Array(input.length);
    for (var /** @type {?} */ i = 0, /** @type {?} */ strLen = input.length; i < strLen; i++) {
        view[i] = input.charCodeAt(i);
    }
    return view.buffer;
}
//# sourceMappingURL=http_utils.js.map

/***/ }),

/***/ "../../../http/src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__backends_browser_xhr__ = __webpack_require__("../../../http/src/backends/browser_xhr.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__backends_browser_xhr__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__backends_jsonp_backend__ = __webpack_require__("../../../http/src/backends/jsonp_backend.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__backends_jsonp_backend__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__backends_jsonp_backend__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__backends_xhr_backend__ = __webpack_require__("../../../http/src/backends/xhr_backend.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__backends_xhr_backend__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__backends_xhr_backend__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__backends_xhr_backend__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_request_options__ = __webpack_require__("../../../http/src/base_request_options.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_3__base_request_options__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_3__base_request_options__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_response_options__ = __webpack_require__("../../../http/src/base_response_options.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_4__base_response_options__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_4__base_response_options__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__enums__ = __webpack_require__("../../../http/src/enums.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_5__enums__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_5__enums__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_5__enums__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_5__enums__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__headers__ = __webpack_require__("../../../http/src/headers.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_6__headers__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__http__ = __webpack_require__("../../../http/src/http.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_7__http__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_7__http__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__http_module__ = __webpack_require__("../../../http/src/http_module.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_8__http_module__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_8__http_module__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__interfaces__ = __webpack_require__("../../../http/src/interfaces.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_9__interfaces__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_9__interfaces__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_9__interfaces__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__static_request__ = __webpack_require__("../../../http/src/static_request.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_10__static_request__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__static_response__ = __webpack_require__("../../../http/src/static_response.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_11__static_response__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__url_search_params__ = __webpack_require__("../../../http/src/url_search_params.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_12__url_search_params__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_12__url_search_params__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__version__ = __webpack_require__("../../../http/src/version.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_13__version__["a"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */














//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../http/src/interfaces.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ConnectionBackend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return XSRFStrategy; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Abstract class from which real backends are derived.
 *
 * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
 * {\@link Request}.
 *
 * \@experimental
 * @abstract
 */
var ConnectionBackend = (function () {
    function ConnectionBackend() {
    }
    /**
     * @abstract
     * @param {?} request
     * @return {?}
     */
    ConnectionBackend.prototype.createConnection = function (request) { };
    return ConnectionBackend;
}());
/**
 * Abstract class from which real connections are derived.
 *
 * \@experimental
 * @abstract
 */
var Connection = (function () {
    function Connection() {
    }
    return Connection;
}());
function Connection_tsickle_Closure_declarations() {
    /** @type {?} */
    Connection.prototype.readyState;
    /** @type {?} */
    Connection.prototype.request;
    /** @type {?} */
    Connection.prototype.response;
}
/**
 * An XSRFStrategy configures XSRF protection (e.g. via headers) on an HTTP request.
 *
 * \@experimental
 * @abstract
 */
var XSRFStrategy = (function () {
    function XSRFStrategy() {
    }
    /**
     * @abstract
     * @param {?} req
     * @return {?}
     */
    XSRFStrategy.prototype.configureRequest = function (req) { };
    return XSRFStrategy;
}());
//# sourceMappingURL=interfaces.js.map

/***/ }),

/***/ "../../../http/src/static_request.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__body__ = __webpack_require__("../../../http/src/body.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enums__ = __webpack_require__("../../../http/src/enums.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__headers__ = __webpack_require__("../../../http/src/headers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__http_utils__ = __webpack_require__("../../../http/src/http_utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__url_search_params__ = __webpack_require__("../../../http/src/url_search_params.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Request; });
/* unused harmony export ArrayBuffer */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





/**
 * Creates `Request` instances from provided values.
 *
 * The Request's interface is inspired by the Request constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#request-class),
 * but is considered a static value whose body can be accessed many times. There are other
 * differences in the implementation, but this is the most significant.
 *
 * `Request` instances are typically created by higher-level classes, like {\@link Http} and
 * {\@link Jsonp}, but it may occasionally be useful to explicitly create `Request` instances.
 * One such example is when creating services that wrap higher-level services, like {\@link Http},
 * where it may be useful to generate a `Request` with arbitrary headers and search params.
 *
 * ```typescript
 * import {Injectable, Injector} from '\@angular/core';
 * import {HTTP_PROVIDERS, Http, Request, RequestMethod} from '\@angular/http';
 *
 * \@Injectable()
 * class AutoAuthenticator {
 *   constructor(public http:Http) {}
 *   request(url:string) {
 *     return this.http.request(new Request({
 *       method: RequestMethod.Get,
 *       url: url,
 *       search: 'password=123'
 *     }));
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, AutoAuthenticator]);
 * var authenticator = injector.get(AutoAuthenticator);
 * authenticator.request('people.json').subscribe(res => {
 *   //URL should have included '?password=123'
 *   console.log('people', res.json());
 * });
 * ```
 *
 * \@experimental
 */
var Request = (function (_super) {
    __extends(Request, _super);
    /**
     * @param {?} requestOptions
     */
    function Request(requestOptions) {
        _super.call(this);
        // TODO: assert that url is present
        var url = requestOptions.url;
        this.url = requestOptions.url;
        if (requestOptions.search) {
            var search = requestOptions.search.toString();
            if (search.length > 0) {
                var prefix = '?';
                if (this.url.indexOf('?') != -1) {
                    prefix = (this.url[this.url.length - 1] == '&') ? '' : '&';
                }
                // TODO: just delete search-query-looking string in url?
                this.url = url + prefix + search;
            }
        }
        this._body = requestOptions.body;
        this.method = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__http_utils__["b" /* normalizeMethodName */])(requestOptions.method);
        // TODO(jeffbcross): implement behavior
        // Defaults to 'omit', consistent with browser
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__headers__["a" /* Headers */](requestOptions.headers);
        this.contentType = this.detectContentType();
        this.withCredentials = requestOptions.withCredentials;
        this.responseType = requestOptions.responseType;
    }
    /**
     * Returns the content type enum based on header options.
     * @return {?}
     */
    Request.prototype.detectContentType = function () {
        switch (this.headers.get('content-type')) {
            case 'application/json':
                return __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].JSON;
            case 'application/x-www-form-urlencoded':
                return __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].FORM;
            case 'multipart/form-data':
                return __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].FORM_DATA;
            case 'text/plain':
            case 'text/html':
                return __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].TEXT;
            case 'application/octet-stream':
                return this._body instanceof ArrayBuffer ? __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].ARRAY_BUFFER : __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].BLOB;
            default:
                return this.detectContentTypeFromBody();
        }
    };
    /**
     * Returns the content type of request's body based on its type.
     * @return {?}
     */
    Request.prototype.detectContentTypeFromBody = function () {
        if (this._body == null) {
            return __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].NONE;
        }
        else if (this._body instanceof __WEBPACK_IMPORTED_MODULE_4__url_search_params__["b" /* URLSearchParams */]) {
            return __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].FORM;
        }
        else if (this._body instanceof FormData) {
            return __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].FORM_DATA;
        }
        else if (this._body instanceof Blob) {
            return __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].BLOB;
        }
        else if (this._body instanceof ArrayBuffer) {
            return __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].ARRAY_BUFFER;
        }
        else if (this._body && typeof this._body === 'object') {
            return __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].JSON;
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].TEXT;
        }
    };
    /**
     * Returns the request's body according to its type. If body is undefined, return
     * null.
     * @return {?}
     */
    Request.prototype.getBody = function () {
        switch (this.contentType) {
            case __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].JSON:
                return this.text();
            case __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].FORM:
                return this.text();
            case __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].FORM_DATA:
                return this._body;
            case __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].TEXT:
                return this.text();
            case __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].BLOB:
                return this.blob();
            case __WEBPACK_IMPORTED_MODULE_1__enums__["e" /* ContentType */].ARRAY_BUFFER:
                return this.arrayBuffer();
            default:
                return null;
        }
    };
    return Request;
}(__WEBPACK_IMPORTED_MODULE_0__body__["a" /* Body */]));
function Request_tsickle_Closure_declarations() {
    /**
     * Http method with which to perform the request.
     * @type {?}
     */
    Request.prototype.method;
    /**
     * {\@link Headers} instance
     * @type {?}
     */
    Request.prototype.headers;
    /**
     * Url of the remote resource
     * @type {?}
     */
    Request.prototype.url;
    /**
     * Type of the request body *
     * @type {?}
     */
    Request.prototype.contentType;
    /**
     * Enable use credentials
     * @type {?}
     */
    Request.prototype.withCredentials;
    /**
     * Buffer to store the response
     * @type {?}
     */
    Request.prototype.responseType;
}
var /** @type {?} */ noop = function () { };
var /** @type {?} */ w = typeof window == 'object' ? window : noop;
var /** @type {?} */ FormData = ((w) /** TODO #9100 */)['FormData'] || noop;
var /** @type {?} */ Blob = ((w) /** TODO #9100 */)['Blob'] || noop;
var /** @type {?} */ ArrayBuffer = ((w) /** TODO #9100 */)['ArrayBuffer'] || noop;
//# sourceMappingURL=static_request.js.map

/***/ }),

/***/ "../../../http/src/static_response.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__body__ = __webpack_require__("../../../http/src/body.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Response; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Creates `Response` instances from provided values.
 *
 * Though this object isn't
 * usually instantiated by end-users, it is the primary object interacted with when it comes time to
 * add data to a view.
 *
 * ### Example
 *
 * ```
 * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
 * ```
 *
 * The Response's interface is inspired by the Response constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
 * can be accessed many times. There are other differences in the implementation, but this is the
 * most significant.
 *
 * \@experimental
 */
var Response = (function (_super) {
    __extends(Response, _super);
    /**
     * @param {?} responseOptions
     */
    function Response(responseOptions) {
        _super.call(this);
        this._body = responseOptions.body;
        this.status = responseOptions.status;
        this.ok = (this.status >= 200 && this.status <= 299);
        this.statusText = responseOptions.statusText;
        this.headers = responseOptions.headers;
        this.type = responseOptions.type;
        this.url = responseOptions.url;
    }
    /**
     * @return {?}
     */
    Response.prototype.toString = function () {
        return "Response with status: " + this.status + " " + this.statusText + " for URL: " + this.url;
    };
    return Response;
}(__WEBPACK_IMPORTED_MODULE_0__body__["a" /* Body */]));
function Response_tsickle_Closure_declarations() {
    /**
     * One of "basic", "cors", "default", "error", or "opaque".
     *
     * Defaults to "default".
     * @type {?}
     */
    Response.prototype.type;
    /**
     * True if the response's status is within 200-299
     * @type {?}
     */
    Response.prototype.ok;
    /**
     * URL of response.
     *
     * Defaults to empty string.
     * @type {?}
     */
    Response.prototype.url;
    /**
     * Status code returned by server.
     *
     * Defaults to 200.
     * @type {?}
     */
    Response.prototype.status;
    /**
     * Text representing the corresponding reason phrase to the `status`, as defined in [ietf rfc 2616
     * section 6.1.1](https://tools.ietf.org/html/rfc2616#section-6.1.1)
     *
     * Defaults to "OK"
     * @type {?}
     */
    Response.prototype.statusText;
    /**
     * Non-standard property
     *
     * Denotes how many of the response body's bytes have been loaded, for example if the response is
     * the result of a progress event.
     * @type {?}
     */
    Response.prototype.bytesLoaded;
    /**
     * Non-standard property
     *
     * Denotes how many bytes are expected in the final response body.
     * @type {?}
     */
    Response.prototype.totalBytes;
    /**
     * Headers object based on the `Headers` class in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#headers-class).
     * @type {?}
     */
    Response.prototype.headers;
}
//# sourceMappingURL=static_response.js.map

/***/ }),

/***/ "../../../http/src/url_search_params.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueryEncoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return URLSearchParams; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * @param {?=} rawParams
 * @return {?}
 */
function paramParser(rawParams) {
    if (rawParams === void 0) { rawParams = ''; }
    var /** @type {?} */ map = new Map();
    if (rawParams.length > 0) {
        var /** @type {?} */ params = rawParams.split('&');
        params.forEach(function (param) {
            var /** @type {?} */ eqIdx = param.indexOf('=');
            var _a = eqIdx == -1 ? [param, ''] : [param.slice(0, eqIdx), param.slice(eqIdx + 1)], key = _a[0], val = _a[1];
            var /** @type {?} */ list = map.get(key) || [];
            list.push(val);
            map.set(key, list);
        });
    }
    return map;
}
/**
 * \@experimental
 *
 */
var QueryEncoder = (function () {
    function QueryEncoder() {
    }
    /**
     * @param {?} k
     * @return {?}
     */
    QueryEncoder.prototype.encodeKey = function (k) { return standardEncoding(k); };
    /**
     * @param {?} v
     * @return {?}
     */
    QueryEncoder.prototype.encodeValue = function (v) { return standardEncoding(v); };
    return QueryEncoder;
}());
/**
 * @param {?} v
 * @return {?}
 */
function standardEncoding(v) {
    return encodeURIComponent(v)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/gi, '$')
        .replace(/%2C/gi, ',')
        .replace(/%3B/gi, ';')
        .replace(/%2B/gi, '+')
        .replace(/%3D/gi, '=')
        .replace(/%3F/gi, '?')
        .replace(/%2F/gi, '/');
}
/**
 * Map-like representation of url search parameters, based on
 * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
 * with several extensions for merging URLSearchParams objects:
 *   - setAll()
 *   - appendAll()
 *   - replaceAll()
 *
 * This class accepts an optional second parameter of ${\@link QueryEncoder},
 * which is used to serialize parameters before making a request. By default,
 * `QueryEncoder` encodes keys and values of parameters using `encodeURIComponent`,
 * and then un-encodes certain characters that are allowed to be part of the query
 * according to IETF RFC 3986: https://tools.ietf.org/html/rfc3986.
 *
 * These are the characters that are not encoded: `! $ \' ( ) * + , ; A 9 - . _ ~ ? /`
 *
 * If the set of allowed query characters is not acceptable for a particular backend,
 * `QueryEncoder` can be subclassed and provided as the 2nd argument to URLSearchParams.
 *
 * ```
 * import {URLSearchParams, QueryEncoder} from '\@angular/http';
 * class MyQueryEncoder extends QueryEncoder {
 *   encodeKey(k: string): string {
 *     return myEncodingFunction(k);
 *   }
 *
 *   encodeValue(v: string): string {
 *     return myEncodingFunction(v);
 *   }
 * }
 *
 * let params = new URLSearchParams('', new MyQueryEncoder());
 * ```
 * \@experimental
 */
var URLSearchParams = (function () {
    /**
     * @param {?=} rawParams
     * @param {?=} queryEncoder
     */
    function URLSearchParams(rawParams, queryEncoder) {
        if (rawParams === void 0) { rawParams = ''; }
        if (queryEncoder === void 0) { queryEncoder = new QueryEncoder(); }
        this.rawParams = rawParams;
        this.queryEncoder = queryEncoder;
        this.paramsMap = paramParser(rawParams);
    }
    /**
     * @return {?}
     */
    URLSearchParams.prototype.clone = function () {
        var /** @type {?} */ clone = new URLSearchParams('', this.queryEncoder);
        clone.appendAll(this);
        return clone;
    };
    /**
     * @param {?} param
     * @return {?}
     */
    URLSearchParams.prototype.has = function (param) { return this.paramsMap.has(param); };
    /**
     * @param {?} param
     * @return {?}
     */
    URLSearchParams.prototype.get = function (param) {
        var /** @type {?} */ storedParam = this.paramsMap.get(param);
        return Array.isArray(storedParam) ? storedParam[0] : null;
    };
    /**
     * @param {?} param
     * @return {?}
     */
    URLSearchParams.prototype.getAll = function (param) { return this.paramsMap.get(param) || []; };
    /**
     * @param {?} param
     * @param {?} val
     * @return {?}
     */
    URLSearchParams.prototype.set = function (param, val) {
        if (val === void 0 || val === null) {
            this.delete(param);
            return;
        }
        var /** @type {?} */ list = this.paramsMap.get(param) || [];
        list.length = 0;
        list.push(val);
        this.paramsMap.set(param, list);
    };
    /**
     * @param {?} searchParams
     * @return {?}
     */
    URLSearchParams.prototype.setAll = function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var /** @type {?} */ list = _this.paramsMap.get(param) || [];
            list.length = 0;
            list.push(value[0]);
            _this.paramsMap.set(param, list);
        });
    };
    /**
     * @param {?} param
     * @param {?} val
     * @return {?}
     */
    URLSearchParams.prototype.append = function (param, val) {
        if (val === void 0 || val === null)
            return;
        var /** @type {?} */ list = this.paramsMap.get(param) || [];
        list.push(val);
        this.paramsMap.set(param, list);
    };
    /**
     * @param {?} searchParams
     * @return {?}
     */
    URLSearchParams.prototype.appendAll = function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var /** @type {?} */ list = _this.paramsMap.get(param) || [];
            for (var /** @type {?} */ i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            _this.paramsMap.set(param, list);
        });
    };
    /**
     * @param {?} searchParams
     * @return {?}
     */
    URLSearchParams.prototype.replaceAll = function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var /** @type {?} */ list = _this.paramsMap.get(param) || [];
            list.length = 0;
            for (var /** @type {?} */ i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            _this.paramsMap.set(param, list);
        });
    };
    /**
     * @return {?}
     */
    URLSearchParams.prototype.toString = function () {
        var _this = this;
        var /** @type {?} */ paramsList = [];
        this.paramsMap.forEach(function (values, k) {
            values.forEach(function (v) { return paramsList.push(_this.queryEncoder.encodeKey(k) + '=' + _this.queryEncoder.encodeValue(v)); });
        });
        return paramsList.join('&');
    };
    /**
     * @param {?} param
     * @return {?}
     */
    URLSearchParams.prototype.delete = function (param) { this.paramsMap.delete(param); };
    return URLSearchParams;
}());
function URLSearchParams_tsickle_Closure_declarations() {
    /** @type {?} */
    URLSearchParams.prototype.paramsMap;
    /** @type {?} */
    URLSearchParams.prototype.rawParams;
    /** @type {?} */
    URLSearchParams.prototype.queryEncoder;
}
//# sourceMappingURL=url_search_params.js.map

/***/ }),

/***/ "../../../http/src/version.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VERSION; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @stable
 */
var /** @type {?} */ VERSION = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["Version"]('2.4.9');
//# sourceMappingURL=version.js.map

/***/ })

});
//# sourceMappingURL=2.chunk.js.map