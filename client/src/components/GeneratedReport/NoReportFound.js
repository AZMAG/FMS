import React from "react";

export default function NoReportFound() {
    return (
        <div className="container bg-gray-100 m-auto flex items-center">
            <div className="bg-mag-teal m-auto my-6">
                <div className="w-9/12 m-auto py-16 min-h-100 flex items-center justify-center">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                        <div className="border-t border-gray-200 text-center pt-8">
                            <h1 className="text-4xl font-medium py-8">
                                Report not found.
                            </h1>
                            <p className="text-2xl pb-8 px-12 font-medium">
                                Oops! No generated report found. Please check
                                the link and try again.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
