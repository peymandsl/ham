import React, { useState, useEffect } from "react";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};
const CoursSubjectsField = ({
  setCoursSubjects,
  setDisableBtn,
  coursSubjects,
}) => {
  useEffect(() => {
    coursSubjects.length > 1 && setDisableBtn(false);
  }, [coursSubjects]);

  const onFinish = (values) => {
    setCoursSubjects(values.subjects);
    // values.subjects.length > 1 && setDisableBtn(false);
    // values.subjects.length < 2 && setDisableBtn(true);
  };

  return (
    <section style={{ width: "100%" }}>
      <Form
        name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
      >
        <Form.List
          name="subjects"
          rules={[
            {
              validator: async (_, subjects) => {
                if (!subjects || subjects.length < 2) {
                  return Promise.reject(
                    new Error("حداق دو سر فصل را وارد کنید")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "عنوان دوره" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "لطفا عنوان دوره را وارد کنید یا فیلد را حذف کنید.",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="سرفصل دوره"
                      style={{
                        width: "90%",
                        marginLeft: "10px",
                      }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "100%",
                  }}
                  icon={<PlusOutlined />}
                >
                  اضافه کردن سرفصل
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            ارسال
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};
export default CoursSubjectsField;
