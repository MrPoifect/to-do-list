

import { uiController} from "./UI.js";
import { loadData } from "./storage.js";
import "./UIStyles.css"
import "./sidebar-styles.css"


loadData();
uiController.refreshContent();
uiController.addModalEvents();








