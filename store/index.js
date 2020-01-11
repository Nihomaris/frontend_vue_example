import Vuex from 'vuex';
import rentTerms from './modules/rent-terms';
import helpdesk from './modules/helpdesk';
import common from './modules/common';
import driverFines from './modules/driverFines';
import sidebar from './modules/sidebar';
import newFeatures from './modules/new-features';
import hints from './modules/hints';
import choiceModal from './modules/choice-modal';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		sidebar,
		rentTerms,
		common,
		helpdesk,
		driverFines,
		newFeatures,
		hints,
		driverFines,
        choiceModal
	}
});