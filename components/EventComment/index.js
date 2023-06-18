import React, { useState } from "react";
import axios from "axios";
import "moment/locale/fa";
import moment from "moment";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { Comment, Form, Button, List, Input, Divider } from "antd";

moment.locale("fa");

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    className="w-100 text-right rtl"
    dataSource={comments}
    header={`${comments.length} پاسخ`}
    itemLayout="horizontal"
    renderItem={({ user, created, content }) => (
      <React.Fragment>
        <Comment
          className="w-100"
          content={content}
          datetime={moment(created).fromNow()}
          author={user.mobile}
        />
        <Divider />
      </React.Fragment>
    )}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value, auth }) => (
  <div>
    {auth ? (
      <>
        <Form.Item>
          <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item className="text-right">
          <Button
            htmlType="submit"
            loading={submitting}
            onClick={onSubmit}
            type="primary"
          >
            اضافه کردن نظر
          </Button>
        </Form.Item>{" "}
      </>
    ) : (
      <div className="text-center">
        <p>برای ثبت نظر ابتدا {<Link href="/auth">وارد</Link>} شوید!</p>
      </div>
    )}
  </div>
);

const EventComment = ({ eventId, comments: commentsList }) => {
  const userData = useSelector((state) => state.userInfo.userData);
  const { status } = useSession();

  const [comments, setComments] = useState(commentsList);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = async () => {
    if (!value) {
      return;
    }

    setSubmitting(true);

    const params = {
      eventId,
      comment: { user: userData.mobile, content: value },
    };

    const addComment = (await axios.post("/api/comments/create", params)).data;

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: userData.mobile,
          avatar: userData.logo,
          content: <p>{value}</p>,
          datetime: moment(addComment.comments[0].created).fromNow(),
        },
      ]);
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Divider>نظرات فیلم</Divider>
      <div className="w-100">
        {comments.length > 0 && <CommentList comments={comments} />}
      </div>
      <Comment
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
            auth={status === "authenticated"}
          />
        }
      />
    </div>
  );
};

export default EventComment;
