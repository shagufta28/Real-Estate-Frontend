import React, { useContext, useState } from 'react';
import { Box, Button, Modal } from '@mui/material'; // Corrected Modal import
import { DatePicker } from '@mantine/dates';
import { useMutation } from 'react-query';
import UserDetailsContext from '../context/UserDetailsContext';
import { bookVisit } from '../../../server/controllers/userController';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const BookingModel = ({ opened, setOpened,email, propertyId }) => {
    const [value, setValue] = useState(null);

    const {userDetails: {token}, setUserDetails} = useContext(UserDetailsContext)


    const handleBookingSuccess =() =>{
        toast.success("You have Booked Your visit",{
            position: "bottom-right"
        });
        setUserDetails((prev)=>({
            ...prev,
            bookings:[
                ...prev.bookings ,
                {
                    id: propertyId, date: dayjs(value).format('DD/MM/YYYY')
                }
            ]
        }))
    };
    

    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
          try {
            await bookVisit(value, propertyId, email, token);
          } catch (err) {
            // Display a more specific error message
          }
        },
        onSuccess: () => handleBookingSuccess(),
        onSettled: () => setOpened(false),
      });

    return (
        <Modal
            open={opened}
            onClose={() => setOpened(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    backgroundColor: 'rgb(42, 42, 42)',
                    padding: { xs: '1.5rem', sm: '2rem' }, // Adjusted padding for mobile
                    borderRadius: '10px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    width: { xs: '90%', sm: '70%', md: '40%' }, // Responsive width
                    maxWidth: '500px',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto',
                    marginTop: { xs: '2rem', md: '5rem' }, // More margin on top for mobile
                }}
            >
                <h2 id="modal-title" style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                    Select your date of visit
                </h2>
                <DatePicker
                    value={value}
                    onChange={setValue}
                    minDate={new Date()}
                    size="sm" // Smaller size for the DatePicker
                    styles={{
                        // Adjusting the dropdown size
                        dropdown: { width: '90%', maxWidth: '250px' }, // Width adjusts for mobile

                        // Styling the header for the arrows and month title
                        calendarHeader: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        },

                        // Arrow style
                        arrow: {
                            fontSize: '16px',
                            cursor: 'pointer',
                        },

                        // Left arrow specific style
                        previous: {
                            marginRight: 'auto',
                        },

                        // Right arrow specific style
                        next: {
                            marginLeft: 'auto',
                        },

                        // Date cell style to make the numbers fit better
                        cell: {
                            height: '35px',
                            width: '35px',
                        },

                        // Selected date style
                        day: {
                            fontSize: '14px',
                        },
                    }}

                    // Custom arrows for better control over appearance
                    previousIcon={<span>←</span>}
                    nextIcon={<span>→</span>}
                />
                <Button
                disabled={!value || isLoading} onClick={()=>mutate()}
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%', padding: '10px 0', marginTop: '1rem', fontSize: { xs: '0.875rem', sm: '1rem' } }}
                >
                    Book
                </Button>
            </Box>
        </Modal>
    );
};

export default BookingModel;
