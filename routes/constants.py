def getDefaultAvatar():
    return "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"
