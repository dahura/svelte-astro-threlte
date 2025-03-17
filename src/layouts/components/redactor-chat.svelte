<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import { ScrollArea } from '$lib/components/ui/scroll-area'
  import { Card } from '$lib/components/ui/card'
  import { fade } from 'svelte/transition'
  import { Bot } from 'lucide-svelte'

  let chatInput = $state('')
  let chatHistory = $state<{ role: 'user' | 'assistant'; content: string; isTyping?: boolean }[]>(
    []
  )
  let isWaitingForResponse = $state(false)

  const simulateTyping = async (message: string) => {
    isWaitingForResponse = true
    chatHistory = [...chatHistory, { role: 'assistant', content: '', isTyping: true }]

    await new Promise((resolve) => setTimeout(resolve, 1000))

    let currentText = ''
    for (let i = 0; i < message.length; i++) {
      currentText += message[i]
      chatHistory = chatHistory.map((msg, index) =>
        index === chatHistory.length - 1 ? { ...msg, content: currentText } : msg
      )
      await new Promise((resolve) => setTimeout(resolve, 30))
    }

    chatHistory = chatHistory.map((msg, index) =>
      index === chatHistory.length - 1 ? { ...msg, isTyping: false } : msg
    )
    isWaitingForResponse = false
  }

  const handleSendMessage = async () => {
    if (chatInput.trim() && !isWaitingForResponse) {
      const userMessage = chatInput
      chatInput = ''

      chatHistory = [...chatHistory, { role: 'user', content: userMessage }]

      const aiResponse = `I understand you're asking about "${userMessage}". Let me help you with that...`
      await simulateTyping(aiResponse)
    }
  }

  const handlePressEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && chatInput.trim() && !isWaitingForResponse) {
      handleSendMessage()
    }
  }
</script>

<div
  class="fixed bottom-0 left-0 right-0 z-10 pl-16 border-t border-border bg-card h-80"
  transition:fade={{ duration: 150 }}
>
  <div class="flex flex-col h-full p-4">
    <!-- Chat History -->
    <ScrollArea class="flex-1">
      <div class="space-y-4">
        {#each chatHistory as message}
          <div transition:fade={{ duration: 150 }} class="transition-all duration-200 ease-in-out">
            <Card class="p-3 transition-shadow duration-200 hover:shadow-md">
              <div class="flex items-start gap-3">
                {#if message.role === 'assistant'}
                  <div
                    class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0"
                  >
                    <Bot class="w-5 h-5 text-primary" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="mb-1 text-sm font-semibold text-primary">AI Assistant</div>
                    <div class="text-sm text-foreground/90">
                      {#if message.isTyping}
                        <div class="flex items-center h-6 gap-1">
                          {#each [0, 1, 2] as i}
                            <span
                              class="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"
                              style="animation-delay: {i * 0.2}s"
                            ></span>
                          {/each}
                        </div>
                      {:else}
                        <p class="break-words">{message.content}</p>
                      {/if}
                    </div>
                  </div>
                {:else}
                  <div
                    class="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary shrink-0"
                  >
                    <span class="text-sm font-semibold">Y</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="mb-1 text-sm font-semibold text-secondary">You</div>
                    <p class="text-sm break-words text-foreground/90">{message.content}</p>
                  </div>
                {/if}
              </div>
            </Card>
          </div>
        {/each}
      </div>
    </ScrollArea>

    <!-- Chat Input -->
    <div class="flex gap-2 pt-4">
      <Input
        bind:value={chatInput}
        placeholder="Type your message..."
        class="flex-1 transition-colors duration-200 bg-background/50 focus:bg-background"
        on:keydown={handlePressEnter}
        disabled={isWaitingForResponse}
      />
      <Button
        onclick={handleSendMessage}
        disabled={isWaitingForResponse}
        class="w-32 px-8 transition-all duration-200"
      >
        Send
      </Button>
    </div>
  </div>
</div>
