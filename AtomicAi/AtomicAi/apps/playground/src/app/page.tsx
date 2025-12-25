"use client";

import { Button, TextField, Select, DatePicker, Table, Form } from "@atomic-ai/ui-antd";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

export default function Home() {
  const [selectedPersona, setSelectedPersona] = useState<"enterprise" | "minimal" | "glass" | "neon">("enterprise");

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "32px" }}>Atomic AI UI - Playground</h1>

      <div style={{ marginBottom: "32px" }}>
        <h2>Buttons</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
          <Button variant="solid" tone="primary">Solid Primary</Button>
          <Button variant="outline" tone="primary">Outline Primary</Button>
          <Button variant="ghost" tone="primary">Ghost Primary</Button>
          <Button variant="solid" tone="danger">Danger</Button>
          <Button variant="solid" tone="success">Success</Button>
          <Button variant="solid" tone="warning">Warning</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button size="xs">XS</Button>
          <Button size="sm">SM</Button>
          <Button size="md">MD</Button>
          <Button size="lg">LG</Button>
          <Button size="xl">XL</Button>
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h2>TextField</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
          <TextField placeholder="Default" />
          <TextField placeholder="Small" size="sm" />
          <TextField placeholder="Large" size="lg" />
          <TextField placeholder="Disabled" disabled />
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h2>Select</h2>
        <Select
          placeholder="Select an option"
          style={{ width: 200 }}
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h2>DatePicker</h2>
        <DatePicker placeholder="Select date" />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h2>Table</h2>
        <Table columns={columns} dataSource={data} />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h2>Form</h2>
        <Form layout="vertical" style={{ maxWidth: "400px" }}>
          <Form.Item label="Name" name="name">
            <TextField placeholder="Enter name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <TextField placeholder="Enter email" />
          </Form.Item>
          <Form.Item>
            <Button type="submit" variant="solid" tone="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

