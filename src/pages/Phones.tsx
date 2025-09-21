import { Button, Form, Input, Switch, Card, Flex } from "antd";
import { useState } from "react";
import { usePhone } from "../hooks/usePhones";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const Phones = () => {
  const { createPhone, deletePhone, updatePhone, getPhone } = usePhone();

  const [editingId, setEditingId] = useState<string | null>(null);

  const { data, isLoading } = getPhone();

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const handleDelete = (id: string) => {
    deletePhone.mutate(id);
  };

  const handleUpdate = (item: any) => {
    setEditingId(item.id);
    form.setFieldsValue({
      title: item.title,
      price: item.price,
      memory: item.memories.join(","),
      image: item.image,
      delivery: item.isDelivery,
    });
  };

  const handleFinish = (values: any) => {
    if (editingId) {
      updatePhone.mutate({
        id: editingId,
        body: {
          title: values.title,
          price: Number(values.price),
          memories: values.memory ? values.memory.split(",") : [],
          image: values.image,
          isDelivery: Boolean(values.isDelivery ?? values.delivery),
        },
      });

      setEditingId(null);
    } else {
      createPhone.mutate({
        title: values.title,
        price: Number(values.price),
        memories: values.memory ? values.memory.split(",") : [],
        image: values.image,
        isDelivery: values.delivery,
      });
    }

    form.resetFields();
  };

  return (
    <div className=" justify-center flex-col mt-14 p-3">
      <Form
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
        onFinish={handleFinish}
        style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input placeholder="Enter phone title" />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <Input placeholder="Enter price" />
        </Form.Item>

        <Form.Item label="Memory" name="memory" rules={[{ required: true }]}>
          <Input placeholder="Enter memory options (comma separated)" />
        </Form.Item>

        <Form.Item label="Image URL" name="image">
          <Input placeholder="Enter image URL" />
        </Form.Item>

        <Form.Item label="Delivery" name="delivery" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingId ? "Update Phone" : "Add Phone"}
          </Button>
          {editingId && (
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => {
                setEditingId(null);
                form.resetFields();
              }}
            >
              Cancel
            </Button>
          )}
        </Form.Item>
      </Form>

      <Flex gap="middle" wrap="wrap" style={{ marginTop: 24 }}>
        {data?.map((item: any) => {
          const actions = [
            <Button key="update" type="link" onClick={() => handleUpdate(item)}>
              Update
            </Button>,
            <Button
              key="delete"
              type="link"
              danger
              loading={deletePhone.isPending} 
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>,
          ];

          return (
            <Card
              key={item.id}
              actions={actions}
              loading={isLoading}
              style={{ minWidth: 300 }}
              cover={
                item.image ? (
                  <img
                    alt={item.title}
                    src={item.image}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                ) : null
              }
            >
              <Card.Meta
                title={item.title}
                description={
                  <>
                    <p>
                      <strong>Price:</strong> ${item.price}
                    </p>
                    <p>
                      <strong>Memory:</strong>{" "}
                      {item.memories?.join(", ") || "Not fount"}
                    </p>
                    <p>
                      <strong>Delivery:</strong>{" "}
                      {item.isDelivery ? "Available" : "Not Available"}
                    </p>
                  </>
                }
              />
            </Card>
          );
        })}
      </Flex>
    </div>
  );
};

export default Phones;
