

import { uiController} from "./UI.js";
import { storageController } from "./storage.js";
import "./UIStyles.css"
import "./sidebar-styles.css"
import "./card-styles.css"


storageController.loadData();
uiController.refreshContent();
uiController.addModalEvents();








