import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { Card, Typography, Button } from "antd";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const { Text } = Typography;

const PageContainer = styled.div`
  border-top: 1px solid #f0f0f0;
  padding-top: 56px;
`;

const ContentWrapper = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 0 16px;
`;

const ProfileSection = styled.div`
  margin-top: 32px;
`;

const ProfileLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  padding: 24px;
`;

const ProfileInfo = styled.div`
  text-align: center;
`;

const Profile = () => {
  const { user, logoutUser } = useContext(ShopContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>My Profile</Title>
        <ProfileSection>
          <Card>
            <ProfileLayout>
              <ProfileInfo>
                <h2>{user.name}</h2>
                <Text type="secondary">{user.email}</Text>
                <div style={{ marginTop: '20px' }}>
                  <Text>Account Type: {user.isAdmin ? 'Administrator' : 'Customer'}</Text>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <Button type="primary" danger onClick={logoutUser}>
                    Logout
                  </Button>
                </div>
              </ProfileInfo>
            </ProfileLayout>
          </Card>
        </ProfileSection>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Profile;
