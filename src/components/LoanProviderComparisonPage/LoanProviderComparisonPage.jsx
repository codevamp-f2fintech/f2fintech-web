import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Box, Divider, CardMedia } from '@mui/material';

import logo1 from '/image1.png'; // Replace with actual logo paths
import logo2 from '/image2.png'; // Replace with actual logo paths
import logo3 from '/image3.png'; // Replace with actual logo paths

const products = [
    {
        id: 1,
        name: 'HDFC',
        logo: logo1,
        ROI: '8.5%',
        fees: '₹1,000',
        tenure: '5 years',
        highlight: 'Low interest rate',
        additionalInfo: 'Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the ',
    },
    {
        id: 2,
        name: 'BAJAJ',
        logo: logo2,
        ROI: '9.0%',
        fees: '₹1,500',
        tenure: '4 years',
        highlight: 'No processing fee for first year',
        additionalInfo: 'Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the  ',
    },
    {
        id: 3,
        name: 'CHOLA',
        logo: logo3,
        ROI: '8.0%',
        fees: '₹2,000',
        tenure: '3 years',
        highlight: 'Quick approval process',
        additionalInfo: 'Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the ',
    },
    {
        id: 4,
        repayment: 'Monthly, Quarterly',
        charges: '₹500 processing fee',
        minimumKYC: 'Aadhaar, PAN Card',
        noDocumentRequired: 'No additional documents required for existing customers',
        description: 'Loan Provider 4 offers flexible repayment options and requires minimal KYC for application. No additional documents are needed for existing customers, making the process quick and easy. Loan Provider 4 offers flexible repayment options and requires minimal KYC for application. No additional documents are needed for existing customers, making the process quick and easy.Loan Provider 4 offers flexible repayment options and requires minimal KYC for application. No additional documents are needed for existing customers, making the process quick and easy.',
    },
    {
        id: 5,
        repayment: 'Monthly, Bi-Monthly',
        charges: '₹600 processing fee',
        minimumKYC: 'Aadhaar, Voter ID',
        noDocumentRequired: 'No document required for customers with a credit score above 750',
        description: 'Loan Provider 5 has lower penalties for late payment and offers easy repayment options. Customers with a credit score above 750 do not need to provide additional documents.Loan Provider 4 offers flexible repayment options and requires minimal KYC for application. No additional documents are needed for existing customers, making the process quick and easy.Loan Provider 4 offers flexible repayment options and requires minimal KYC for application. No additional documents are needed for existing customers, making the process quick and easy.',
    },
    {
        id: 6,
        repayment: 'Monthly, Semi-Annual',
        charges: '₹700 processing fee',
        minimumKYC: 'Aadhaar, Passport',
        noDocumentRequired: 'No document required for salaried individuals',
        description: 'Loan Provider 6 is known for its excellent customer service and offers various repayment options. Salaried individuals do not need to provide additional documents. Loan Provider 4 offers flexible repayment options and requires minimal KYC for application. No additional documents are needed for existing customers, making the process quick and easy.Loan Provider 4 offers flexible repayment options and requires minimal KYC for application. No additional documents are needed for existing customers, making the process quick and easy.',
    },
];

function LoanProviderComparisonPage() {
    return (
        <Container>
            <Box my={4}>
            </Box>
            <Grid container spacing={4}>
                {products.slice(0, 3).map((product) => (
                    <Grid item xs={12} md={4} key={product.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.logo}
                                alt={product.name}
                                style={{ objectFit: 'contain', padding: '16px' }}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ROI: {product.ROI}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Fees & Charge: {product.fees}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Tenure: {product.tenure}
                                </Typography>
                                <Typography variant="body2" color="textPrimary">
                                    Highlight: {product.highlight}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Divider style={{ margin: '0' }} />
            <Grid container spacing={4}>
                {products.slice(3).map((product) => (
                    <Grid item xs={12} md={4} key={product.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    <strong>Repayment:</strong> {product.repayment}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Charges:</strong> {product.charges}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Minimum KYC:</strong> {product.minimumKYC}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>No Document Required:</strong> {product.noDocumentRequired}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Description:</strong> {product.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default LoanProviderComparisonPage;
