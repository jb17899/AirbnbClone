'use client';
import { useEffect } from "react";
import EmptyState from "./src/components/EmptyState";
interface ErrorProps {
    error: Error;
}
const Error: React.FC<ErrorProps> = ({ error }) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <EmptyState title="Uh oh!" subtitle="Something went wrong." />
    );
};
export default Error;