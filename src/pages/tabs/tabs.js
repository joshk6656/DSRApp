import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { HelpPage } from '../help/help';
import { HomePage } from '../home/home';
var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = HomePage;
        this.tab2Root = AboutPage;
        this.tab3Root = HelpPage;
    }
    TabsPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'tabs.html'
                },] },
    ];
    /** @nocollapse */
    TabsPage.ctorParameters = function () { return []; };
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.js.map