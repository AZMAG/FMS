import React from "react";

export default function LoadingSpin() {
    return (
        <button type="button" class="... bg-indigo-500" disabled>
            <svg class="... mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24" />
            Processing...
        </button>
    );
}
