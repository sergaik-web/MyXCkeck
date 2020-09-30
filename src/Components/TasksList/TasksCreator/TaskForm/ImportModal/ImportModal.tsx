import React from 'react';
import { Input, Modal } from 'antd';

interface ImportModalProps {
  importType: string;
  visible: boolean;
  form: any;
  onOkModal: any;
  onCancelModal: any;
}

const ImportModal = ({ importType, visible, form, onOkModal, onCancelModal }: ImportModalProps) => {
  return (
    <Modal
      title={`Insert your task in ${importType} format`}
      visible={visible}
      onOk={() => onOkModal(importType)}
      onCancel={() => onCancelModal()}
      okText="OK"
      cancelText="Cancel"
    >
      <Input.TextArea rows={4} id={importType} />
    </Modal>
  );
};

export default ImportModal;
