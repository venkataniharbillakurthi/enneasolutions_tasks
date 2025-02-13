import React, { useState, useEffect } from 'react';
import { Typography, Button, Table, Modal, Form, Input, message, Spin } from 'antd';
import axios from 'axios';
import styled from 'styled-components';

const { Title } = Typography;

const AdminDashboardContainer = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 20px;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin-top: 10px;
`;

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [form] = Form.useForm();

 
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/courses', {
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });
      setCourses(response.data);
      
    } catch (error) {
      message.error('Failed to fetch courses');
    }
  };

  
  const handleSubmit = async (values) => {
    try {
      if (currentCourse) {
        await axios.put(`http://localhost:3001/courses/${currentCourse.id}`, values, {
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        });
        message.success('Course updated successfully');
      } else {
        await axios.post('http://localhost:3001/courses', values, {
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        });
        message.success('Course added successfully');
      }
      
      fetchCourses();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to save course');
    }
  };

  
  const handleDelete = (courseId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this course?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Cancel',
      onOk: async () => {
        try {
          if (!courseId) {
            message.error('Invalid course ID');
            return;
          }

          // Check if course exists
          if (!courses.find(course => course.id === courseId)) {
            message.error('Course not found in the current list.');
            return;
          }

          setDeleting(true);

          const response = await axios.delete(`http://localhost:3001/courses/${courseId}`, {
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
          });

          if (response.status === 200) {
            message.success('Course deleted successfully');
            fetchCourses();
          } else {
            message.error('Failed to delete course');
          }
        } catch (error) {
          console.error('Delete Error:', error);
          if (error.response) {
            switch (error.response.status) {
              case 401:
                message.error('Unauthorized: Please log in again.');
                break;
              case 403:
                message.error('You do not have permission to delete this course');
                break;
              case 404:
                message.error('Course not found');
                break;
              default:
                message.error('An error occurred while deleting the course');
            }
          } else if (error.request) {
            message.error('No response from server. Please check your network connection.');
          } else {
            message.error('Error setting up the delete request');
          }
        } finally {
          setDeleting(false);
        }
      }
    });
  };


  const showModal = (course = null) => {
    setCurrentCourse(course);
    form.resetFields();
    
    if (course) {
      form.setFieldsValue(course);
    }
    setIsModalVisible(true);
  };

  
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        image ? <img src={image} alt="Course" style={{ width: 50, height: 50, objectFit: 'cover' }} /> : null
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Instructor',
      dataIndex: 'instructor',
      key: 'instructor',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button type="link"  onClick={() => showModal(record)}>Edit</Button>
          <Button 
            type="link" 
            danger 
            onClick={() => handleDelete(record.id)}
            disabled={deleting}
          >
            {deleting ? <Spin size="small" /> : 'Delete'}
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <AdminDashboardContainer>
      <Title level={2}>Admin Dashboard</Title>
      
      <Button 
        type="primary" 
        style={{ marginBottom: 16 , color: 'white', backgroundColor: 'orange'}} 
        
        onClick={() => showModal()}
      >
        Add New Course
      </Button>

      <Table 
        columns={columns} 
        dataSource={courses} 
        rowKey="id" 
      />

      <Modal
        title={currentCourse ? 'Edit Course' : 'Add New Course'}
        open={isModalVisible} 
        
        
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Course Title"
            rules={[{ required: true, message: 'Please input the course title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="instructor"
            label="Instructor Name"
            rules={[{ required: true, message: 'Please input the instructor name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Course Description"
            rules={[{ required: true, message: 'Please input the course description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="image"
            label="Course Image URL"
            rules={[{ type: 'url', message: 'Please enter a valid URL!' }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>
          {form.getFieldValue('image') && (
            <Form.Item>
              <ImagePreview 
                src={form.getFieldValue('image')} 
                alt="Course Preview" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  message.error('Invalid image URL');
                }}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
