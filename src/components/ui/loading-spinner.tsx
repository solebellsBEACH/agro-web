"use client"

import * as React from "react"

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
    </div>
  )
}

