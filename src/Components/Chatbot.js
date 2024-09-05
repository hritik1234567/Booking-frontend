
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import Payment from './Payment'; 
import '../utility/chatbot.css';

function ChatbotCard({ selectedCity, selectedMuseum }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilityChecked, setAvailabilityChecked] = useState(true);
  const [ticketsAvailable, setTicketsAvailable] = useState(5);
  const [currentStep, setCurrentStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [numChildren, setNumChildren] = useState(0);
  const [numAdults, setNumAdults] = useState(0);
  const [idFile, setIdFile] = useState(null);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const filterDate = (date) => {
    const day = date.getDay();
    const isTodayOrTomorrow = 
      date.toDateString() === today.toDateString() || 
      date.toDateString() === tomorrow.toDateString();
      
    return isTodayOrTomorrow && day !== 1;
  };

  const calculateTotalAmount = () => {
    const childPrice = 30;
    const adultPrice = 50;
    return (numChildren * childPrice) + (numAdults * adultPrice);
  };

  const checkAvailability = async () => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }

    try {
      // Fetch the client token from your server
      const response = await fetch(`http://localhost:8000/api/check-availability`); // Update with your API endpoint
      const res = await response.json(); // Assuming response is a JSON object with a clientToken property
      
      setTicketsAvailable(res.remainingTickets);
      setAvailabilityChecked(true);
      if(ticketsAvailable>0){
      setCurrentStep(2);} // Start the booking process
    } catch (error) {
      console.error("Error checking availability:", error);
    }
  };

  const handleFileChange = (event) => {
    setIdFile(event.target.files[0]);
  };

  const handleBooking = () => {
    setPaymentInitiated(true);
  };

  const handlePaymentSuccess = (details) => {
    alert(`Payment Successful! Booking confirmed for ${userName} on ${selectedDate.toDateString()}`);
    // Further handle the booking confirmation process here
  };

  const renderStep = () => {
    if (paymentInitiated) {
      return (
        <Payment
        city={selectedCity}
        museum={selectedMuseum}
        date={selectedDate}
        name={userName}
        email={email}
        children={numChildren}
        adults={numAdults}
        idFile={idFile}
        amount={calculateTotalAmount()}
        onSuccess={handlePaymentSuccess}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <>
            <label htmlFor="datepicker">Select Date</label>
            <DatePicker 
              selected={selectedDate} 
              onChange={(date) => setSelectedDate(date)} 
              dateFormat="yyyy/MM/dd" 
              placeholderText="Select a date"
              className="date-picker"
              minDate={today}
              maxDate={tomorrow}
              filterDate={filterDate}
            />
            <button onClick={checkAvailability} className="check-availability-btn">
              Check Availability
            </button>
          </>
        );
      case 2:
        return (
          <>
          <p>Available Tickets: {ticketsAvailable !== null ? ticketsAvailable : "Checking..."}</p>

            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
              placeholder="Enter your name"
            />
            <button onClick={() => setCurrentStep(3)} disabled={!userName} className="next-step-btn">
              Next
            </button>
          </>
        );
      case 3:
        return (
          <>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
            />
            <button onClick={() => setCurrentStep(4)} disabled={!email} className="next-step-btn">
              Next
            </button>
          </>
        );
      case 4:
        return (
          <>
            <label htmlFor="numChildren">Number of Children</label>
            <input 
              type="number" 
              id="numChildren" 
              value={numChildren} 
              onChange={(e) => setNumChildren(parseInt(e.target.value, 10) || 0)} 
              min="0"
            />
            <label htmlFor="numAdults">Number of Adults</label>
            <input 
              type="number" 
              id="numAdults" 
              value={numAdults} 
              onChange={(e) => setNumAdults(parseInt(e.target.value, 10) || 0)} 
              min="0"
            />
            <button onClick={() => setCurrentStep(5)} className="next-step-btn">
              Next
            </button>
          </>
        );
      case 5:
        return (
          <>
            <label htmlFor="idFile">Upload ID</label>
            <input 
              type="file" 
              id="idFile" 
              onChange={handleFileChange}
            />
            <p>Total Payment: ${calculateTotalAmount()}</p>
            <button 
              onClick={handleBooking} 
              disabled={!idFile} 
              className="book-now-btn"
            >
              Book Now
            </button>
          </>
        );
      default:
        return null;
    }
  };

  if (!selectedCity || !selectedMuseum) {
    return null; 
  }

  return (
    <div className="card chatbot-card">
      <h2>Chatbot</h2>
      {availabilityChecked ? renderStep() : (
        <>
          <p>1. Select the date of your visit.</p>
          <DatePicker 
            selected={selectedDate} 
            onChange={(date) => setSelectedDate(date)} 
            dateFormat="yyyy/MM/dd" 
            placeholderText="Select a date"
            className="date-picker"
            minDate={today}
            maxDate={tomorrow}
            filterDate={filterDate}
          />
          <button onClick={checkAvailability} className="check-availability-btn">
            Check Availability
          </button>
        </>
      )}
      {availabilityChecked && ticketsAvailable === 0 && (
        <p>Sorry, no tickets are available for the selected date.</p>
      )}
    </div>
  );
}

export default ChatbotCard;