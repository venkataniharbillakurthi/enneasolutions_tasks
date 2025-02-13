import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, message, Avatar, Button, Popconfirm } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

const ProfileCard = styled(Card)`
  margin-bottom: 24px;
  .ant-card-body {
    padding: 24px;
  }
`;

const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const UserDetails = styled.div`
  margin-left: 24px;
`;

const CourseCard = styled(Card)`
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  .ant-card-cover img {
    height: 200px;
    object-fit: cover;
  }
`;

const DeleteButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

const StudentProfile = () => {
  const { userId, isAuthenticated} = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated && storedAuth !== 'true') {
      navigate('/login');
    } else {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/student-profile');
    }
  }, [isAuthenticated, navigate]);

  const fetchUserDataAndCourses = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const enrollmentsResponse = await axios.get(`http://localhost:3001/enrollments?userId=${userId}`);
      const enrollments = enrollmentsResponse.data;

      const coursesWithDetails = await Promise.all(
        enrollments.map(async (enrollment) => {
          try {
            const courseResponse = await axios.get(`http://localhost:3001/courses/${enrollment.courseId}`);
            return {
              ...enrollment,
              courseImage: courseResponse.data.image
            };
          } catch (error) {
            console.error(`Error fetching course ${enrollment.courseId}:`, error);
            return enrollment;
          }
        })
      );

      setEnrolledCourses(coursesWithDetails);

      if (coursesWithDetails.length > 0) {
        const firstEnrollment = coursesWithDetails[0];
        setUserDetails({
          name: firstEnrollment.studentName,
          email: firstEnrollment.studentEmail,
          phone: firstEnrollment.studentPhone
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Failed to load profile data');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchUserDataAndCourses();
    }
  }, [isAuthenticated, userId]);

  const handleDeleteEnrollment = async (enrollmentId) => {
    try {
      await axios.delete(`http://localhost:3001/enrollments/${enrollmentId}`);
      message.success('Course enrollment deleted successfully');
      fetchUserDataAndCourses();
    } catch (error) {
      console.error('Error deleting enrollment:', error);
      message.error('Failed to delete enrollment');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ProfileContainer>
      <ProfileCard>
        <UserInfoBox>
          <Avatar 
            size={120}
            src="/profile.png"
            icon={<UserOutlined />}
          />
          <UserDetails>
            <Title level={2}>{userDetails?.name}</Title>
            <Text strong>Email: </Text>
            <Text>{userDetails?.email}</Text>
            <br />
            <Text strong>Phone: </Text>
            <Text>{userDetails?.phone}</Text>
          </UserDetails>
        </UserInfoBox>

        <Title level={3} style={{ marginTop: '32px' }}>Enrolled Courses</Title>
        <Row gutter={[16, 16]}>
          {enrolledCourses.map(course => (
            <Col xs={24} sm={12} lg={8} key={course.id}>
              <CourseCard
                hoverable
                cover={
                  <img
                    alt={course.courseName}
                    src={course.courseImage}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                }
              >
                <Popconfirm
                  title="Delete Enrollment"
                  description="Are you sure you want to delete this course enrollment?"
                  onConfirm={() => handleDeleteEnrollment(course.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteButton 
                    type="primary" 
                    danger 
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
                <Card.Meta
                  title={course.courseName}
                  description={
                    <>
                      <p><strong>Enrollment Date:</strong> {new Date(course.enrollmentDate).toLocaleDateString()}</p>
                      <p><strong>Status:</strong> {course.status}</p>
                    </>
                  }
                />
              </CourseCard>
            </Col>
          ))}
        </Row>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default StudentProfile;
