import { boot } from "quasar/wrappers";
import BasePassword from "components/Form/BasePassword.vue";
import BaseSelect from "components/Form/BaseSelect.vue";
import BaseTextField from "components/Form/BaseTextField.vue";
import BaseFile from "components/Form/BaseFile.vue";

/**
 * Boot for import global components
 */
export default boot(async ({ app }) => {
    app.component("BaseFile", BaseFile);
    app.component("BaseTextField", BaseTextField);
    app.component("BaseSelect", BaseSelect);
    app.component("BasePassword", BasePassword);
});
