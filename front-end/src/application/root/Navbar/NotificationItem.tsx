import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { NotificationType } from '@/shared/types/NotificationType';
import { useNavigate } from 'react-router-dom';
import { NotificationService } from '@/shared/services/NotificationService';


const getTimeAgo = (notificationTimestamp: Date): string => {
  const notificationTime = new Date(notificationTimestamp);
  const currentTime = new Date();

  const timeDifference = Math.floor((currentTime.getTime() - notificationTime.getTime()) / 1000);

  if (timeDifference < 60) {
    return `${timeDifference} seconds ago`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    const days = Math.floor(timeDifference / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
};

interface NotificationItemProp{
  notification: NotificationResp,
}

export default function NotificationItem({notification}:NotificationItemProp){
    const navigate = useNavigate();
    const getNotificationInfo = (notification:NotificationResp)=>{
      switch(notification.notifycationType){
        case NotificationType.FinalizedGradeComposition:
          return {
            title: "Finalized Grade Composition",
            desc: "New Grade",
            content: `Your grade composition has been finalized by teacher ${notification.sender.fullname}`,
            link: `/class/${notification.classId}`
          }
        case NotificationType.TeacherReplyReview:
          return{
            title: 'Teacher Replied to your Review',
            desc: "New comment",
            content: `Teacher ${notification.sender.fullname} has replied to your review.`,
            link: `/class/${notification.classId}/feed/review/${notification.reviewId}`
          }
        case NotificationType.FinalDecisionOnMarkReview:
          return{
            title: 'Final Decision on Mark Review',
            desc: "Finalized Review",
            content: `A final decision has been made on your mark review by teacher ${notification.sender.fullname}.`,
            link: `/class/${notification.classId}/feed/review/${notification.reviewId}`
          }
          case NotificationType.GradeReviewRequest:
            return { 
              title: 'Grade Review Request', 
              desc:"New Review",
              content: `Student ${notification.sender.fullname} have created a request for a grade review.` ,
              link: `/class/${notification.classId}/feed/review/${notification.reviewId}`
            };
          case NotificationType.StudentReplyReview:
            return { 
              title: 'Student Replied to Review', 
              desc: "New Comment",
              content: `Student ${notification.sender.fullname} has replied to his review.`,
              link: `/class/${notification.classId}/feed/review/${notification.reviewId}` 
            };
          default:
            return { 
              title: 'Unknown Notification Type', 
              content: 'Unknown notification type.',
              desc :'Unkonw',
              link: '/class' };
      }
    }
    const [notificationInfo, setNotificationInfo] = React.useState(getNotificationInfo(notification));
    

    const handleClick = ()=>{
      if(notification.isRead == false){
        notification.isRead = true;
        setNotificationInfo(getNotificationInfo(notification))
        NotificationService.markNotificationAsRead(notification.id);
      }
      navigate(notificationInfo.link);
    }
    return (
      <>
        <ListItem alignItems="flex-start" sx={{ backgroundColor: notification.isRead ? 'inherit':'#fef2f2' }} onClick={handleClick}>
        <ListItemText
          primary={notificationInfo?.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {notificationInfo?.desc +" - "}
              </Typography>
              {notificationInfo?.content}
              <div>
                {getTimeAgo(notification.createdAt)}
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider sx={{ width: '100%', color: 'black',borderTop: '1px solid #ccc' }} />
      </>
    )
}