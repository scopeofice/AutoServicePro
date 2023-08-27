import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="bg-dark text-light py-3">
            <Container>
                <div className="text-center">
                    <p>&copy; {new Date().getFullYear()} AutoServicePro. All rights reserved.</p>
                    <p>Address: 1234 Main St, City, State ZIP</p>
                    <p>Email: info@autoservicepro.com</p>
                </div>
            </Container>
        </footer>
    );
}
