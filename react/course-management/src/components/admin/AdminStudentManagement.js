import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Popconfirm,
  Card,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import api from '../../utils/axiosConfig';
import axios from 'axios';

const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const COURSES_URL = 'http://localhost:3001/courses';
const ENROLLMENTS_URL = 'http://localhost:3001/enrollments';

const AdminStudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [enrollmentCounts, setEnrollmentCounts] = useState({});
  const [totalEnrollments, setTotalEnrollments] = useState(0);
  const [form] = Form.useForm();

  // Returns the authorization header for secure API calls.
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Fetch all student records, filtering out admins.
  const fetchStudents = async () => {
    try {
      const response = await api.get('/api/auth/users', {
        ...getAuthHeader(),
        params: { role: 'ROLE_USER' },
      });
      const onlyStudents = response.data.filter(
        (user) => user.role === 'ROLE_USER' && !user.email.includes('admin')
      );
      setStudents(onlyStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
      message.error('Failed to fetch students');
    }
  };

  // Fetch courses from the JSON server.
  const fetchCourses = async () => {
    try {
      const response = await axios.get(COURSES_URL);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      message.error('Failed to fetch courses');
    }
  };

  // Fetch enrollments and update enrollment counts and total enrollments.
  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.get(ENROLLMENTS_URL);
      countEnrollments(response.data);
      setTotalEnrollments(response.data.length);
    } catch (error) {
      console.error('Error fetching enrollment data:', error);
      message.error('Failed to fetch enrollment data');
    }
  };

  // Count enrollments per student and gather course names.
  const countEnrollments = (enrollments) => {
    if (!Array.isArray(enrollments)) return;
    const counts = {};
    const courseNames = {};
    enrollments.forEach(({ userId, courseName }) => {
      counts[userId] = (counts[userId] || 0) + 1;
      courseNames[userId] = courseNames[userId]
        ? [...courseNames[userId], courseName]
        : [courseName];
    });
    const enrollmentDetails = Object.keys(counts).reduce((acc, email) => {
      acc[email] = { count: counts[email], courses: courseNames[email] };
      return acc;
    }, {});
    setEnrollmentCounts(enrollmentDetails);
  };

  // Load all data (students, courses, enrollments) concurrently.
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchStudents(),
        fetchCourses(),
        fetchEnrolledCourses(),
      ]);
      setLoading(false);
    };
    loadData();
  }, [modalVisible]);

  // Resets and closes the modal.
  const resetModal = () => {
    setModalVisible(false);
    setEditingStudent(null);
    form.resetFields();
  };

  // Handle student creation or update.
  const handleSubmit = async (values) => {
    const payload = {
      username: values.name,
      email: values.email,
      password: values.password,
      role: 'USER',
    };
    try {
      if (editingStudent) {
        await api.put(
          `/api/auth/users/${editingStudent.id}`,
          payload,
          getAuthHeader()
        );
        message.success('Student updated successfully');
      } else {
        await api.post('/api/auth/register', payload, getAuthHeader());
        message.success('Student added successfully');
      }
      resetModal();
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
      message.error('Failed to save student');
    }
  };

  // Deletes a student and also removes related enrollment records.
  const handleDelete = async (studentId) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) {
      message.error('Student not found');
      return;
    }
    try {
      await api.delete(`/api/auth/users/${studentId}`, getAuthHeader());
      const { data: enrollments } = await axios.get(ENROLLMENTS_URL);
      const studentEnrollments = enrollments.filter(
        (enroll) => enroll.userId === student.email
      );
      await Promise.all(
        studentEnrollments.map((enroll) =>
          axios.delete(`${ENROLLMENTS_URL}/${enroll.id}`)
        )
      );
      message.success('Student deleted successfully');
      fetchStudents();
      fetchEnrolledCourses();
    } catch (error) {
      console.error('Error deleting student:', error);
      message.error('Failed to delete student');
    }
  };

  // Open modal prefilled with student data for editing.
  const handleEdit = (student) => {
    setEditingStudent(student);
    form.setFieldsValue({
      name: student.username,
      email: student.email,
    });
    setModalVisible(true);
  };

  // Table column definitions.
  const columns = [
    {
      title: 'Student_Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Student_Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            style={{ borderColor: 'orange', color: 'orange' }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Student"
            description="Are you sure you want to delete this student?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={record.role === 'ROLE_ADMIN'}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              disabled={record.role === 'ROLE_ADMIN'}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: 'Student_Enrolled Courses',
      key: 'enrolledCourses',
      render: (_, record) => {
        const details = enrollmentCounts[record.email];
        return details ? (
          <span>
            {details.count} courses: {details.courses.join(', ')}
          </span>
        ) : (
          <span>0 courses</span>
        );
      },
    },
  ];

  return (
    <Container>
      {/* Summary Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Students"
              value={students.length}
              prefix={<UsergroupAddOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Courses"
              value={courses.length}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Enrollments"
              value={totalEnrollments}
              prefix={<FileAddOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <TitleBar>
        <h1>Student Management</h1>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          style={{ backgroundColor: 'orange', borderColor: 'orange' }}
          onClick={() => {
            setEditingStudent(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Add Student
        </Button>
      </TitleBar>

      <Table loading={loading} dataSource={students} columns={columns} rowKey="id" />

      <Modal
        title={editingStudent ? 'Edit Student' : 'Add New Student'}
        open={modalVisible}
        onCancel={resetModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: 'orange', borderColor: 'orange' }}
              >
                {editingStudent ? 'Update' : 'Add'}
              </Button>
              <Button
                style={{ borderColor: 'orange', color: 'orange' }}
                onClick={resetModal}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminStudentManagement;
