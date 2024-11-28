import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle, X } from 'lucide-react'

interface WelcomePopupProps {
  show: boolean
  onClose: () => void
}

export function WelcomePopup({ show, onClose }: WelcomePopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl"
          >
            <Card className="relative overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="p-6">
                <h2 className="mb-6 text-2xl font-bold text-primary">
                  Welcome to African Journal Visibility
                </h2>

                <div className="mb-6 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                  <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                    <AlertTriangle className="h-5 w-5" />
                    <h3 className="font-semibold">Important Notice</h3>
                  </div>
                  <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                    Some data may be AI-generated. Please verify critical information before use.
                  </p>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Thank you for visiting our platform. We continuously update our data
                    and features to provide the most accurate information about academic
                    journals across Africa.
                  </p>
                  <p>
                    Our team is working to address naming inconsistencies and improve
                    data quality. Some information may be incomplete as we refine our
                    database.
                  </p>
                  <p>
                    Despite these limitations, we strive to provide valuable insights
                    into academic publishing in Africa.
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <Button onClick={onClose} className="px-8">
                    Get Started
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}