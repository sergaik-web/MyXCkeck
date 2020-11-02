import { message, Modal } from 'antd';
import createEssence from './createEssenceTask';

const exportJsonData = (editMode: undefined | boolean, valueMde: any, form: any) => {
  if (editMode) {
    const description = valueMde.value();
    const formValues = form.getFieldsValue();
    const taskEssence = createEssence(formValues, description);
    try {
      navigator.clipboard.writeText(JSON.stringify(taskEssence));
      message.success('Export in clipboard success');
    } catch (e) {
      message.error(e);
    }
  } else {
    const modal = Modal.error({
      title: 'Please save this task first',
    });
    setTimeout(() => {
      modal.destroy();
    }, 3000);
  }
};

export default exportJsonData;
