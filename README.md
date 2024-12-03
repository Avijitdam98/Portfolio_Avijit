

# 📞 Portfolio - React Application [ (https://avijitdampf.netlify.app/)]

A responsive **Contact Me** web page built with modern technologies like React.js, EmailJS, and Tailwind CSS. This project demonstrates a seamless user experience with real-time form validation, email notifications, and toast feedback for user interactions.

---

## 🚀 Features  

- **Dynamic Contact Form**:  
  Allow users to send messages by filling in their name, email, and a message.  

- **Real-Time Validation**:  
  Ensure proper data is entered, including email format validation.  

- **Email Notifications via EmailJS**:  
  Emails are sent directly to the configured recipient.  

- **Responsive Design**:  
  Fully responsive UI using **Tailwind CSS** for mobile, tablet, and desktop users.  

- **Toast Notifications**:  
  Real-time success or error alerts using **React Toastify**.  

- **Social Media Integration**:  
  Direct links to GitHub, LinkedIn, and Twitter.  

---

## 🛠️ Technologies Used  

- **React.js**: Frontend library for building user interfaces.  
- **Tailwind CSS**: Utility-first CSS framework for rapid styling.  
- **EmailJS**: A service to send emails directly from the client-side.  
- **React Toastify**: For real-time toast notifications.  
- **React Icons**: For beautiful icons in the UI.  

---

## 🖥️ Installation  

### Step 1: Clone the Repository  
```bash  
git clone https://github.com/<your-github-username>/<your-repo-name>.git  
cd <your-repo-name>  
```  

### Step 2: Install Dependencies  
Install required packages using npm:  
```bash  
npm install  
```  

### Step 3: Set Up Environment Variables  
Create a `.env` file in the root directory with the following values:  
```plaintext  
REACT_APP_EMAILJS_SERVICE_ID=your_service_id  
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id  
REACT_APP_EMAILJS_USER_ID=your_user_id  
```  
> Replace `your_service_id`, `your_template_id`, and `your_user_id` with your EmailJS credentials.

### Step 4: Run the Application  
Start the development server:  
```bash  
npm start  
```  
Open [http://localhost:5173](http://localhost:5173) in your browser to see the application.

---

## 📂 Project Structure  

```plaintext  
src/  
├── components/  
│   └── Contact.jsx       # Contact form component  
├── App.jsx               # Root component  
├── index.css             # Global styles (with Tailwind)  
└── index.js              # Entry point  
```  

---

## 🌐 Screenshots  

### Desktop View  
![image](https://github.com/user-attachments/assets/0cf287a7-d7a0-4e48-bf17-2c0ed469151d)


### Mobile View  
![image](https://github.com/user-attachments/assets/51275000-d682-4e75-b6cd-a9a357fd7901)

---

## 📋 Usage  

1. Navigate to the **Contact Me** section of the app.  
2. Fill in the **Name**, **Email**, and **Message** fields.  
3. Submit the form.  
4. You’ll receive a success or error notification depending on the response.

---

## 🌟 Highlights  

- **Efficient State Management**:  
  Uses React's `useState` for managing form input.  

- **Error Handling**:  
  Feedback for missing fields, invalid email addresses, or failed email delivery.  

- **Responsive Design**:  
  Ensures usability across devices.  

---

## 📜 License  

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for more details.

---

## 🙌 Acknowledgements  

- **[React](https://reactjs.org/)**  
- **[EmailJS](https://www.emailjs.com/)**  
- **[Tailwind CSS](https://tailwindcss.com/)**  
- **[React Toastify](https://fkhadra.github.io/react-toastify/)**  

---

## 👨‍💻 Author  

**Avijit Dam**  
- GitHub: [Avijitdam98](https://github.com/Avijitdam98)  
 

---

This version improves clarity, provides a structured flow, and maintains professionalism. Be sure to add screenshots and replace placeholders with your repository and personal information!
