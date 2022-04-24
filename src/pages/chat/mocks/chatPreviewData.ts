import moment from "moment"

interface User {
    first_name: string,
        second_name: string,
        avatar: string,
        email: string,
        login: string,
        phone: string
};

export interface ChatPreview {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
      user: User,
      time: string,
      content: string
    }
  }

  const chatPreviewData: ChatPreview[] = [
    {
      "id": 123,
      "title": "my-chat",
      "avatar": "/123/avatar1.jpg",
      "unread_count": 15,
      "last_message": {
        "user": {
          "first_name": "Petya",
          "second_name": "Pupkin",
          "avatar": "/path/to/avatar.jpg",
          "email": "my@email.com",
          "login": "userLogin",
          "phone": "8(911)-222-33-22"
        },
        "time": "2020-01-02T14:22:22.000Z",
        "content": "this is message content"
      }
    },
    {
      "id": 123,
      "title": "my-chat",
      "avatar": "/123/avatar1.jpg",
      "unread_count": 15,
      "last_message": {
        "user": {
          "first_name": "Petya",
          "second_name": "Pupkin",
          "avatar": "/path/to/avatar.jpg",
          "email": "my@email.com",
          "login": "userLogin",
          "phone": "8(911)-222-33-22"
        },
        "time": "2020-01-02T14:22:22.000Z",
        "content": "this is message content"
      }
    }
  ]

  const replaceTimeFormat = (chatPreviewData) => {
    chatPreviewData.forEach(data => {
      data.last_message.time = moment(data.last_message.time).fromNow()
    })
  }

  replaceTimeFormat(chatPreviewData)

export default chatPreviewData;
