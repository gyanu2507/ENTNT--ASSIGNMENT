import React, { useState } from 'react';
import './Order.css';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import { FaEdit, FaTrash } from 'react-icons/fa';

let initialRecords = [
  { id: 1, recordId: 'REC001', customerName: 'Emma Thompson', recordDate: '2024-03-15', status: 'Pending', expectedDeliveryDate: new Date() },
  { id: 2, recordId: 'REC002', customerName: 'Oliver Wilson', recordDate: '2024-03-16', status: 'Processing', expectedDeliveryDate: new Date() },
  { id: 3, recordId: 'REC003', customerName: 'Sophia Evans', recordDate: '2024-03-17', status: 'Delivered', expectedDeliveryDate: new Date() },
  { id: 4, recordId: 'REC004', customerName: 'James Anderson', recordDate: '2024-03-15', status: 'Pending', expectedDeliveryDate: new Date() },
];

function Order() {
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState('');

  const generateRandomDate = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 10);
    return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  
    if (!date) {
      setSelectedRecords(records);
      setSelectedDeliveryStatus('');
      return;
    }
  
    setSelectedRecords([]);
    setSelectedDeliveryStatus('In Progress');
  
    setSelectedRecords(records.filter(record => {
      const expectedDeliveryDate = new Date(record.expectedDeliveryDate);
      return (
        expectedDeliveryDate.getDate() === date.getDate() &&
        expectedDeliveryDate.getMonth() === date.getMonth() &&
        expectedDeliveryDate.getFullYear() === date.getFullYear()
      );
    }));
  };

  const handleViewRecordDetails = (record) => {
    setSelectedRecord({
      ...record,
      shippingDate: generateRandomDate(),
      expectedDeliveryDate: generateRandomDate()
    });
  };

  const handleUpdateRecordStatus = (recordId, newStatus) => {
    const updatedRecords = records.map(record => {
      if (record.recordId === recordId) {
        return { ...record, status: newStatus };
      }
      return record;
    });
    setRecords(updatedRecords);
  };

  const handleDeleteRecord = (recordId) => {
    const updatedRecords = records.filter(record => record.recordId !== recordId);
    setRecords(updatedRecords);
  };

  return (
    <div className="order-container">
      <h2 className="order-heading">Record Management</h2>
      <div className="order-content">
        {selectedRecord && (
          <div className="record-details">
            <h3>Record Details</h3>
            <p><strong>Record ID:</strong> {selectedRecord.recordId}</p>
            <p><strong>Customer Name:</strong> {selectedRecord.customerName}</p>
            <p><strong>Record Date:</strong> {selectedRecord.recordDate}</p>
            <p><strong>Status:</strong> {selectedRecord.status}</p>
            <p><strong>Shipping Date:</strong> {selectedRecord.shippingDate.toDateString()}</p>
            <p><strong>Expected Delivery Date:</strong> {selectedRecord.expectedDeliveryDate.toDateString()}</p>
            <button onClick={() => setSelectedRecord(null)} className="close-details-button">Close Details</button>
          </div>
        )}
        <div className="record-list">
          {records.map(record => (
            <div key={record.id} className="record-item">
              <p><strong>Record ID:</strong> {record.recordId}</p>
              <p><strong>Customer Name:</strong> {record.customerName}</p>
              <p><strong>Record Date:</strong> {record.recordDate}</p>
              <p><strong>Status:</strong> {record.status}</p>
              <button onClick={() => handleViewRecordDetails(record)} className="view-details-button">View Details</button>
              <button onClick={() => handleUpdateRecordStatus(record.recordId, 'Shipped')} className="update-status-button">Ship</button>
              <button onClick={() => handleDeleteRecord(record.recordId)} className="delete-button"><FaTrash /></button>
            </div>
          ))}
        </div>
        <div className="dashboard-container">
          <h2>Records Calendar View</h2>
          <div className="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
            />
          </div>
          <div className="selected-records">
            <h3>Records for {selectedDate.toDateString()}</h3>
            <ul>
              {selectedRecords.map(record => (
                <li key={record.id}>{record.customerName}</li>
              ))}
            </ul>
            {selectedDeliveryStatus && (
              <p><strong>Delivery Status:</strong> {selectedDeliveryStatus}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
