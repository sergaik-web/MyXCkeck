import React from 'react';
import { Input, Modal } from 'antd';

interface ImportModalProps {
  title: string;
  importType: string;
  visible: boolean;
  form: any;
  onOkModal: any;
  onCancelModal: any;
}

const ImportModal = ({
  title,
  importType,
  visible,
  form,
  onOkModal,
  onCancelModal,
}: ImportModalProps) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={() => onOkModal(importType)}
      onCancel={() => onCancelModal(importType)}
      okText="OK"
      cancelText="Cancel"
    >
      <Input.TextArea rows={4} id={importType} />
    </Modal>
  );
};

export default ImportModal;
