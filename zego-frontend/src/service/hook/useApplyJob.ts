import { useMutation } from '@tanstack/react-query';
import type { CreateApplicationRequest } from '../../interface/request';
import { submitApplication } from '../api/submitApplication';

export const useApplyJob = () => {
    return useMutation({
        mutationFn: (data: CreateApplicationRequest) => submitApplication(data),
        onSuccess: (data) => {
            console.log('Application submitted successfully:', data);
            alert('สมัครงานสำเร็จ! Candidate ID: ' + data.candidateId);
        },
        onError: (error) => {
            console.error('Error submitting application:', error);
            alert('เกิดข้อผิดพลาดในการสมัครงาน');
        },
    });
};