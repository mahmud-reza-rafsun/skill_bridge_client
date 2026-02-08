export interface BookingModalProps {
    tutor: any;
    isOpen: boolean;
    onClose: () => void;
}

export interface BookingCardProps {
    booking: {
        _id: string;
        status: string;
        totalAmmount: number;
        startTime: string;
        endTime: string;
        tutorId?: {
            name: string;
        };
    };
}