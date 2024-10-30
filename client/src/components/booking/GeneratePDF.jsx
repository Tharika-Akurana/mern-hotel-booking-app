import React from "react";
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // to include tables

import logo from "../../assets/Images/Logo.png";

//Booking Pdf Generator
const GeneratePdf = ({
  fullName,
  email,
  phone,
  name,
  hotelType,
  numberOfGuests,
  totalPrice,
  checkInTimeForRestaurant,
  checkOutTimeForRestaurant,
  stayOrFunction,
  functionType,
  checkInDate,
  checkOutDate,
  roomType,
}) => {
  const doc = new jsPDF();

  // Add "Stay and Dine Hub" Logo
  doc.addImage(logo, "PNG", 20, 10, 20, 20);

  // Add Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Booking Confirmation", 20, 40);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for booking with Stay and Dine Hub.", 20, 48);

  // Line Separator
  doc.setLineWidth(0.5);
  doc.line(20, 50, 190, 50);

  // Guest Information
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Guest Information", 20, 60);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Full Name: ${fullName}`, 20, 70);
  doc.text(`Email: ${email}`, 20, 80);
  doc.text(`Phone: ${phone}`, 20, 90);

  // Hotel Details (Common)
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Booking Details", 20, 110);

  const tableData = [
    { item: "Hotel Name", value: name },
    { item: "Hotel Type", value: hotelType },
    { item: "Number of Guests", value: numberOfGuests },
    { item: "Total Price", value: `$${totalPrice.toFixed(2)}` },
  ];

  // Add dynamic details based on hotel type
  if (hotelType === "restaurant") {
    tableData.push(
      { item: "Check-In Time", value: checkInTimeForRestaurant },
      { item: "Check-Out Time", value: checkOutTimeForRestaurant }
    );
  } else if (
    hotelType === "resort" ||
    hotelType === "boutique" ||
    hotelType === "luxury"
  ) {
    tableData.push(
      { item: "Stay or Function", value: stayOrFunction },
      ...(stayOrFunction === "function"
        ? [{ item: "Function Type", value: functionType }]
        : [
            { item: "Room Type", value: roomType },
            { item: "Check-In Date", value: checkInDate },
            { item: "Check-Out Date", value: checkOutDate },
          ])
    );
  } else if (
    hotel.hotelType === "guestHouse" ||
    hotel.hotelType === "business" ||
    hotel.hotelType === "transient" ||
    hotel.hotelType === "budget"
  ) {
    tableData.push(
      { item: "Room Type", value: roomType },
      { item: "Check-In Date", value: checkInDate },
      { item: "Check-Out Date", value: checkOutDate }
    );
  }

  // Generate the table using jsPDF autotable
  doc.autoTable({
    startY: 120,
    head: [["Item", "Details"]],
    body: tableData.map(({ item, value }) => [item, value]),
    theme: "grid",
    styles: { halign: "left" },
    headStyles: { fillColor: [44, 62, 80] },
  });

  // Footer with Thank You message
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Thank you for choosing Stay and Dine Hub!",
    20,
    doc.internal.pageSize.height - 20
  );

  // Save the PDF
  doc.save("booking_confirmation.pdf");
};

export default GeneratePdf;
