import React from "react";

export default function LoadingSpin() {
    return (
        <button type="button" disabled>
            <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24" />
            Processing...
        </button>
    );
}
